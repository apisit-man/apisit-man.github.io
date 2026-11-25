"""Tests for gen-image-agy.py: the size mapping and the check of the agy transcript.

    python3 -m unittest adapters/test_gen_image_agy.py      # from the skill root

The transcript lines copy the shape that agy writes to
~/.gemini/antigravity-cli/brain/<id>/.system_generated/logs/transcript.jsonl.
"""
import importlib.util
import json
import unittest
from pathlib import Path

_spec = importlib.util.spec_from_file_location(
    "gen_image_agy", Path(__file__).with_name("gen-image-agy.py"))
assert _spec is not None and _spec.loader is not None
agy = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(agy)

PROMPT = 'A "red" bicycle, flat style, no ground shadow, no glow.'
IMG = "/Users/x/.gemini/antigravity-cli/brain/abc/red_bicycle_1.jpg"


def call_step(prompt=PROMPT, aspect="1:1", inputs=None, extra_calls=()):
    args = {"AspectRatio": json.dumps(aspect), "ImageName": json.dumps("red_bicycle"),
            "Prompt": json.dumps(prompt)}
    if inputs is not None:
        args["ImagePaths"] = json.dumps(inputs)
    calls = [{"name": "generate_image", "args": args}, *extra_calls]
    return json.dumps({"step_index": 1, "type": "PLANNER_RESPONSE", "tool_calls": calls})


def result_step(uri: str | None = f"file://{IMG}"):
    media = [{"mime_type": "image/jpeg", "uri": uri}] if uri else []
    return json.dumps({"step_index": 2, "type": "GENERIC",
                       "content": f"Generated image is saved at {IMG}.", "media": media})


class AspectTest(unittest.TestCase):
    def test_known_sizes(self):
        self.assertEqual(agy.aspect_for("1024x1024"), "1:1")
        self.assertEqual(agy.aspect_for("1536x1024"), "3:2")
        self.assertEqual(agy.aspect_for("1080x1920"), "9:16")

    def test_unknown_size_is_rejected(self):
        with self.assertRaises(ValueError):
            agy.aspect_for("1000x1000")


class FindGeneratedTest(unittest.TestCase):
    def test_returns_the_generated_file(self):
        lines = [call_step(), result_step()]
        self.assertEqual(agy.find_generated(lines, PROMPT, "1:1", []), Path(IMG))

    def test_edit_with_matching_inputs(self):
        lines = [call_step(inputs=["/tmp/w/in-0.png"]), result_step()]
        got = agy.find_generated(lines, PROMPT, "1:1", ["/tmp/w/in-0.png"])
        self.assertEqual(got, Path(IMG))

    def test_rewritten_prompt_is_rejected(self):
        lines = [call_step(prompt="A red bicycle in flat style."), result_step()]
        with self.assertRaisesRegex(agy.Mismatch, "prompt"):
            agy.find_generated(lines, PROMPT, "1:1", [])

    def test_wrong_aspect_is_rejected(self):
        lines = [call_step(aspect="16:9"), result_step()]
        with self.assertRaisesRegex(agy.Mismatch, "aspect"):
            agy.find_generated(lines, PROMPT, "1:1", [])

    def test_missing_input_image_is_rejected(self):
        lines = [call_step(), result_step()]
        with self.assertRaisesRegex(agy.Mismatch, "input"):
            agy.find_generated(lines, PROMPT, "1:1", ["/tmp/w/in-0.png"])

    def test_no_call_is_rejected(self):
        with self.assertRaisesRegex(agy.Mismatch, "no generate_image"):
            agy.find_generated([result_step()], PROMPT, "1:1", [])

    def test_two_calls_are_rejected(self):
        lines = [call_step(), result_step(), call_step(), result_step()]
        with self.assertRaisesRegex(agy.Mismatch, "2 generate_image"):
            agy.find_generated(lines, PROMPT, "1:1", [])

    def test_call_without_media_is_rejected(self):
        lines = [call_step(), result_step(uri=None)]
        with self.assertRaisesRegex(agy.Mismatch, "no image"):
            agy.find_generated(lines, PROMPT, "1:1", [])

    def test_unrelated_lines_are_skipped(self):
        lines = ["", "not json", json.dumps({"type": "SYSTEM_MESSAGE"}), call_step(), result_step()]
        self.assertEqual(agy.find_generated(lines, PROMPT, "1:1", []), Path(IMG))


class InstructionTest(unittest.TestCase):
    def test_prompt_is_embedded_as_json(self):
        text = agy.build_instruction(PROMPT, "3:2", ["/tmp/w/in-0.png"])
        self.assertIn(json.dumps(PROMPT), text)
        self.assertIn('"3:2"', text)
        self.assertIn(json.dumps(["/tmp/w/in-0.png"]), text)


if __name__ == "__main__":
    unittest.main()
