param(
    [string] $FilePath,
    [string] $Version
)

$Content = Get-Content -Path $FilePath -Raw
$Content = $Content -replace "latest", $Version
Set-Content -Path $FilePath -Value $Content
