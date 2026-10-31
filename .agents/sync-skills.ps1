# Sync Skills & Plugins between Workspace (.agents/) and Global (~/.gemini/config/)
param(
    [ValidateSet("InstallToGlobal", "BackupFromGlobal", "Both")]
    [string]$Mode = "Both"
)

$ErrorActionPreference = "Stop"
$RepoAgentsDir = $PSScriptRoot
$WorkspaceSkills = Join-Path $RepoAgentsDir "skills"
$WorkspacePlugins = Join-Path $RepoAgentsDir "plugins-bundle"

$GlobalConfigDir = Join-Path $HOME ".gemini\config"
$GlobalSkills = Join-Path $GlobalConfigDir "skills"
$GlobalPlugins = Join-Path $GlobalConfigDir "plugins"

New-Item -ItemType Directory -Path $GlobalSkills -Force | Out-Null
New-Item -ItemType Directory -Path $GlobalPlugins -Force | Out-Null
New-Item -ItemType Directory -Path $WorkspaceSkills -Force | Out-Null
New-Item -ItemType Directory -Path $WorkspacePlugins -Force | Out-Null

if ($Mode -eq "InstallToGlobal" -or $Mode -eq "Both") {
    Write-Host "==> Installing workspace skills to global (~/.gemini/config/skills)..." -ForegroundColor Cyan
    Get-ChildItem -Path $WorkspaceSkills -Directory | ForEach-Object {
        $dest = Join-Path $GlobalSkills $_.Name
        Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
        Write-Host "  [+] Skill installed: $($_.Name)"
    }

    if (Test-Path $WorkspacePlugins) {
        Write-Host "==> Installing bundled plugins to global (~/.gemini/config/plugins)..." -ForegroundColor Cyan
        Get-ChildItem -Path $WorkspacePlugins -Directory | ForEach-Object {
            $dest = Join-Path $GlobalPlugins $_.Name
            Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
            Write-Host "  [+] Plugin installed: $($_.Name)"
        }
    }
}

if ($Mode -eq "BackupFromGlobal" -or $Mode -eq "Both") {
    Write-Host "==> Backing up global skills to workspace (.agents/skills)..." -ForegroundColor Green
    Get-ChildItem -Path $GlobalSkills -Directory | ForEach-Object {
        $dest = Join-Path $WorkspaceSkills $_.Name
        Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
        Write-Host "  [*] Skill backed up: $($_.Name)"
    }

    Write-Host "==> Backing up global plugins to workspace (.agents/plugins-bundle)..." -ForegroundColor Green
    Get-ChildItem -Path $GlobalPlugins -Directory | ForEach-Object {
        $dest = Join-Path $WorkspacePlugins $_.Name
        Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
        Write-Host "  [*] Plugin backed up: $($_.Name)"
    }
}

Write-Host "`nDone! Total skills synced: $((Get-ChildItem -Path $WorkspaceSkills -Directory).Count)" -ForegroundColor Yellow
