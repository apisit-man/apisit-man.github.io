# Sync Skills, Rules & Plugins between Workspace (.agents/) and Global (~/.gemini/config/)
# In "Both" mode (default), newer files win automatically based on LastWriteTimeUtc!
param(
    [ValidateSet("InstallToGlobal", "BackupFromGlobal", "Both")]
    [string]$Mode = "Both"
)

$ErrorActionPreference = "Stop"
$RepoAgentsDir = $PSScriptRoot
$WorkspaceSkills = Join-Path $RepoAgentsDir "skills"
$WorkspaceRules = Join-Path $RepoAgentsDir "rules"
$WorkspacePlugins = Join-Path $RepoAgentsDir "plugins-bundle"

$GlobalConfigDir = Join-Path $HOME ".gemini\config"
$GlobalSkills = Join-Path $GlobalConfigDir "skills"
$GlobalRules = Join-Path $GlobalConfigDir "rules"
$GlobalPlugins = Join-Path $GlobalConfigDir "plugins"

New-Item -ItemType Directory -Path $GlobalSkills, $GlobalRules, $GlobalPlugins -Force | Out-Null
New-Item -ItemType Directory -Path $WorkspaceSkills, $WorkspaceRules, $WorkspacePlugins -Force | Out-Null

function Sync-DirectoryTwoWay($DirA, $DirB, $Label) {
    $allRelPaths = @{}
    Get-ChildItem -Path $DirA -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        $rel = $_.FullName.Substring($DirA.Length).TrimStart('\', '/')
        $allRelPaths[$rel] = $true
    }
    Get-ChildItem -Path $DirB -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        $rel = $_.FullName.Substring($DirB.Length).TrimStart('\', '/')
        $allRelPaths[$rel] = $true
    }

    $updatedCount = 0
    foreach ($rel in $allRelPaths.Keys) {
        $fileA = Join-Path $DirA $rel
        $fileB = Join-Path $DirB $rel
        $existsA = Test-Path $fileA
        $existsB = Test-Path $fileB

        if ($existsA -and -not $existsB) {
            New-Item -ItemType Directory -Path (Split-Path $fileB -Parent) -Force | Out-Null
            Copy-Item -Path $fileA -Destination $fileB -Force
            $updatedCount++
        } elseif ($existsB -and -not $existsA) {
            New-Item -ItemType Directory -Path (Split-Path $fileA -Parent) -Force | Out-Null
            Copy-Item -Path $fileB -Destination $fileA -Force
            $updatedCount++
        } else {
            $timeA = (Get-Item $fileA).LastWriteTimeUtc
            $timeB = (Get-Item $fileB).LastWriteTimeUtc
            if ([math]::Abs(($timeA - $timeB).TotalSeconds) -gt 1) {
                if ($timeA -gt $timeB) {
                    Copy-Item -Path $fileA -Destination $fileB -Force
                    $updatedCount++
                } else {
                    Copy-Item -Path $fileB -Destination $fileA -Force
                    $updatedCount++
                }
            }
        }
    }
    Write-Host "==> Two-way synced $Label ($updatedCount files updated; newest file always wins)." -ForegroundColor Cyan
}

if ($Mode -eq "Both") {
    Sync-DirectoryTwoWay -DirA $WorkspaceSkills -DirB $GlobalSkills -Label "Skills (.agents/skills <-> ~/.gemini/config/skills)"
    Sync-DirectoryTwoWay -DirA $WorkspaceRules -DirB $GlobalRules -Label "Rules (.agents/rules <-> ~/.gemini/config/rules)"
    Sync-DirectoryTwoWay -DirA $WorkspacePlugins -DirB $GlobalPlugins -Label "Plugins (.agents/plugins-bundle <-> ~/.gemini/config/plugins)"
} elseif ($Mode -eq "InstallToGlobal") {
    Copy-Item -Path "$WorkspaceSkills\*" -Destination $GlobalSkills -Recurse -Force
    Copy-Item -Path "$WorkspaceRules\*" -Destination $GlobalRules -Recurse -Force
    Copy-Item -Path "$WorkspacePlugins\*" -Destination $GlobalPlugins -Recurse -Force
    Write-Host "==> Installed all workspace skills, rules, and plugins to ~/.gemini/config/" -ForegroundColor Cyan
} elseif ($Mode -eq "BackupFromGlobal") {
    Copy-Item -Path "$GlobalSkills\*" -Destination $WorkspaceSkills -Recurse -Force
    Copy-Item -Path "$GlobalRules\*" -Destination $WorkspaceRules -Recurse -Force
    Copy-Item -Path "$GlobalPlugins\*" -Destination $WorkspacePlugins -Recurse -Force
    Write-Host "==> Backed up all global skills, rules, and plugins to .agents/" -ForegroundColor Green
}

Write-Host "Done! Total skills synced: $((Get-ChildItem -Path $WorkspaceSkills -Directory).Count)" -ForegroundColor Yellow
