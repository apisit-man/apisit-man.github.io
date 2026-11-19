$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
py scripts/validate.py examples/sample-storyboard.json
py scripts/render.py --storyboard examples/sample-storyboard.json --output out/demo.mp4 --preview --tts auto --voice Puck --music auto --style assets/style-profile.json
Write-Host "Ready: $PSScriptRoot\out\demo.mp4"
