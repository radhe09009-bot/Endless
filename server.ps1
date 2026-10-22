param([int]$Port = 8080)

$Root = "c:\Users\Admin\.gemini\antigravity-ide\brain\ac9fbdb5-23e1-4ecd-af44-cc2e9af77a95\scratch"
$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add("http://localhost:$Port/")
$Listener.Start()
Write-Output "LeafSense Server running at http://localhost:$Port/"

try {
    while ($Listener.IsListening) {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $UrlPath = $Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($UrlPath)) { $UrlPath = "index.html" }
        $FilePath = Join-Path $Root $UrlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)

        if (Test-Path $FilePath -PathType Leaf) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = switch ($Ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }
            $Response.ContentType = $ContentType
            $Response.Headers.Add("Access-Control-Allow-Origin", "*")
            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentLength64 = $Bytes.Length
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
        } else {
            $Response.StatusCode = 404
            $NotFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $Response.OutputStream.Write($NotFound, 0, $NotFound.Length)
        }
        $Response.OutputStream.Close()
    }
} finally {
    $Listener.Stop()
    $Listener.Close()
}
