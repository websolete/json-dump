param(
  [string]$OutputDirectory = (Join-Path $PSScriptRoot '..\images')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function New-Color([string]$Hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($Hex)
}

function New-RoundedRectanglePath(
  [float]$X,
  [float]$Y,
  [float]$Width,
  [float]$Height,
  [float]$Radius
) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $Radius * 2

  $path.StartFigure()
  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  return $path
}

function Fill-RoundedRectangle(
  $Graphics,
  $Brush,
  [float]$X,
  [float]$Y,
  [float]$Width,
  [float]$Height,
  [float]$Radius
) {
  $path = New-RoundedRectanglePath -X $X -Y $Y -Width $Width -Height $Height -Radius $Radius
  try {
    $Graphics.FillPath($Brush, $path)
  }
  finally {
    $path.Dispose()
  }
}

function Draw-RoundedRectangle(
  $Graphics,
  $Pen,
  [float]$X,
  [float]$Y,
  [float]$Width,
  [float]$Height,
  [float]$Radius
) {
  $path = New-RoundedRectanglePath -X $X -Y $Y -Width $Width -Height $Height -Radius $Radius
  try {
    $Graphics.DrawPath($Pen, $path)
  }
  finally {
    $path.Dispose()
  }
}

function New-StringFormat([string]$HorizontalAlignment = 'Near', [string]$VerticalAlignment = 'Near') {
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::$HorizontalAlignment
  $format.LineAlignment = [System.Drawing.StringAlignment]::$VerticalAlignment
  return $format
}

function Draw-CenteredText(
  $Graphics,
  [string]$Text,
  [string]$FontFamily,
  [float]$FontSize,
  [System.Drawing.FontStyle]$FontStyle,
  $Brush,
  [float]$X,
  [float]$Y,
  [float]$Width,
  [float]$Height
) {
  $font = [System.Drawing.Font]::new($FontFamily, $FontSize, $FontStyle, [System.Drawing.GraphicsUnit]::Pixel)
  $format = New-StringFormat -HorizontalAlignment Center -VerticalAlignment Center

  try {
    $rectangle = [System.Drawing.RectangleF]::new($X, $Y, $Width, $Height)
    $Graphics.DrawString($Text, $font, $Brush, $rectangle, $format)
  }
  finally {
    $format.Dispose()
    $font.Dispose()
  }
}

function Draw-IconScene($Graphics, [float]$OriginX, [float]$OriginY, [float]$Size) {
  $state = $Graphics.Save()
  $scale = $Size / 256.0

  $backgroundBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    ([System.Drawing.PointF]::new($OriginX, $OriginY)),
    ([System.Drawing.PointF]::new($OriginX + $Size, $OriginY + $Size)),
    (New-Color '#10283f'),
    (New-Color '#264f78')
  )
  $highlightBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(48, 182, 227, 255))
  $shadowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(70, 7, 17, 31))
  $truckBrush = [System.Drawing.SolidBrush]::new((New-Color '#f1a63b'))
  $truckAccentBrush = [System.Drawing.SolidBrush]::new((New-Color '#d68918'))
  $windowBrush = [System.Drawing.SolidBrush]::new((New-Color '#dcefff'))
  $wheelBrush = [System.Drawing.SolidBrush]::new((New-Color '#132234'))
  $hubBrush = [System.Drawing.SolidBrush]::new((New-Color '#8bbde4'))
  $strokePen = [System.Drawing.Pen]::new((New-Color '#0c1825'), [single](5 * $scale))
  $groundPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(90, 120, 164, 206), [single](3 * $scale))
  $tileBrush = [System.Drawing.SolidBrush]::new((New-Color '#a6ddff'))
  $tileShadowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(65, 7, 17, 31))
  $tilePen = [System.Drawing.Pen]::new((New-Color '#dff3ff'), [single](3 * $scale))
  $tileTextBrush = [System.Drawing.SolidBrush]::new((New-Color '#16314a'))

  try {
    Fill-RoundedRectangle -Graphics $Graphics -Brush $backgroundBrush -X $OriginX -Y $OriginY -Width $Size -Height $Size -Radius (30 * $scale)
    $Graphics.FillEllipse($highlightBrush, $OriginX + (18 * $scale), $OriginY + (10 * $scale), 140 * $scale, 92 * $scale)
    $Graphics.FillEllipse($shadowBrush, $OriginX + (48 * $scale), $OriginY + (176 * $scale), 166 * $scale, 26 * $scale)

    $Graphics.DrawLine($groundPen, $OriginX + (34 * $scale), $OriginY + (188 * $scale), $OriginX + (226 * $scale), $OriginY + (188 * $scale))

    foreach ($tile in @(
      @{ Letter = 'j'; X = 28; Y = 122; Angle = -20 },
      @{ Letter = 's'; X = 56; Y = 101; Angle = -12 },
      @{ Letter = 'o'; X = 86; Y = 82; Angle = -4 },
      @{ Letter = 'n'; X = 116; Y = 67; Angle = 8 }
    )) {
      $tileState = $Graphics.Save()
      $tileSize = 38 * $scale
      $tileX = $OriginX + ($tile.X * $scale)
      $tileY = $OriginY + ($tile.Y * $scale)

      try {
        $Graphics.FillEllipse($tileShadowBrush, $tileX + (4 * $scale), $tileY + (24 * $scale), 24 * $scale, 12 * $scale)
        $Graphics.TranslateTransform($tileX + ($tileSize / 2), $tileY + ($tileSize / 2))
        $Graphics.RotateTransform([float]$tile.Angle)
        $Graphics.TranslateTransform(-($tileSize / 2), -($tileSize / 2))

        Fill-RoundedRectangle -Graphics $Graphics -Brush $tileBrush -X 0 -Y 0 -Width $tileSize -Height $tileSize -Radius (9 * $scale)
        Draw-RoundedRectangle -Graphics $Graphics -Pen $tilePen -X 0 -Y 0 -Width $tileSize -Height $tileSize -Radius (9 * $scale)
        Draw-CenteredText -Graphics $Graphics -Text $tile.Letter -FontFamily 'Segoe UI Black' -FontSize (18 * $scale) -FontStyle ([System.Drawing.FontStyle]::Bold) -Brush $tileTextBrush -X 0 -Y (-1 * $scale) -Width $tileSize -Height $tileSize
      }
      finally {
        $Graphics.Restore($tileState)
      }
    }

    $bedPoints = [System.Drawing.PointF[]]@(
      [System.Drawing.PointF]::new($OriginX + (104 * $scale), $OriginY + (104 * $scale)),
      [System.Drawing.PointF]::new($OriginX + (182 * $scale), $OriginY + (83 * $scale)),
      [System.Drawing.PointF]::new($OriginX + (195 * $scale), $OriginY + (125 * $scale)),
      [System.Drawing.PointF]::new($OriginX + (116 * $scale), $OriginY + (146 * $scale))
    )
    $Graphics.FillPolygon($truckBrush, $bedPoints)
    $Graphics.DrawPolygon($strokePen, $bedPoints)

    Fill-RoundedRectangle -Graphics $Graphics -Brush $truckAccentBrush -X ($OriginX + (111 * $scale)) -Y ($OriginY + (134 * $scale)) -Width (96 * $scale) -Height (38 * $scale) -Radius (10 * $scale)
    Draw-RoundedRectangle -Graphics $Graphics -Pen $strokePen -X ($OriginX + (111 * $scale)) -Y ($OriginY + (134 * $scale)) -Width (96 * $scale) -Height (38 * $scale) -Radius (10 * $scale)

    $cabPoints = [System.Drawing.PointF[]]@(
      [System.Drawing.PointF]::new($OriginX + (181 * $scale), $OriginY + (122 * $scale)),
      [System.Drawing.PointF]::new($OriginX + (215 * $scale), $OriginY + (122 * $scale)),
      [System.Drawing.PointF]::new($OriginX + (228 * $scale), $OriginY + (138 * $scale)),
      [System.Drawing.PointF]::new($OriginX + (228 * $scale), $OriginY + (172 * $scale)),
      [System.Drawing.PointF]::new($OriginX + (181 * $scale), $OriginY + (172 * $scale))
    )
    $Graphics.FillPolygon($truckBrush, $cabPoints)
    $Graphics.DrawPolygon($strokePen, $cabPoints)

    Fill-RoundedRectangle -Graphics $Graphics -Brush $windowBrush -X ($OriginX + (191 * $scale)) -Y ($OriginY + (129 * $scale)) -Width (26 * $scale) -Height (19 * $scale) -Radius (4 * $scale)
    Draw-RoundedRectangle -Graphics $Graphics -Pen $strokePen -X ($OriginX + (191 * $scale)) -Y ($OriginY + (129 * $scale)) -Width (26 * $scale) -Height (19 * $scale) -Radius (4 * $scale)

    Fill-RoundedRectangle -Graphics $Graphics -Brush $truckBrush -X ($OriginX + (95 * $scale)) -Y ($OriginY + (163 * $scale)) -Width (123 * $scale) -Height (14 * $scale) -Radius (6 * $scale)
    Draw-RoundedRectangle -Graphics $Graphics -Pen $strokePen -X ($OriginX + (95 * $scale)) -Y ($OriginY + (163 * $scale)) -Width (123 * $scale) -Height (14 * $scale) -Radius (6 * $scale)

    foreach ($wheelX in @(129, 203)) {
      $Graphics.FillEllipse($wheelBrush, $OriginX + (($wheelX - 22) * $scale), $OriginY + (154 * $scale), 44 * $scale, 44 * $scale)
      $Graphics.FillEllipse($hubBrush, $OriginX + (($wheelX - 8) * $scale), $OriginY + (168 * $scale), 16 * $scale, 16 * $scale)
    }
  }
  finally {
    $groundPen.Dispose()
    $strokePen.Dispose()
    $tilePen.Dispose()
    $tileTextBrush.Dispose()
    $tileShadowBrush.Dispose()
    $tileBrush.Dispose()
    $hubBrush.Dispose()
    $wheelBrush.Dispose()
    $windowBrush.Dispose()
    $truckAccentBrush.Dispose()
    $truckBrush.Dispose()
    $shadowBrush.Dispose()
    $highlightBrush.Dispose()
    $backgroundBrush.Dispose()
    $Graphics.Restore($state)
  }
}

function Draw-Badge($Graphics, [string]$Text, [float]$X, [float]$Y, [float]$Width) {
  $badgeBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(34, 172, 222, 255))
  $badgePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(55, 172, 222, 255), [single]1.5)
  $textBrush = [System.Drawing.SolidBrush]::new((New-Color '#dff3ff'))

  try {
    Fill-RoundedRectangle -Graphics $Graphics -Brush $badgeBrush -X $X -Y $Y -Width $Width -Height 42 -Radius 21
    Draw-RoundedRectangle -Graphics $Graphics -Pen $badgePen -X $X -Y $Y -Width $Width -Height 42 -Radius 21
    Draw-CenteredText -Graphics $Graphics -Text $Text -FontFamily 'Segoe UI Semibold' -FontSize 18 -FontStyle ([System.Drawing.FontStyle]::Bold) -Brush $textBrush -X $X -Y $Y -Width $Width -Height 40
  }
  finally {
    $textBrush.Dispose()
    $badgePen.Dispose()
    $badgeBrush.Dispose()
  }
}

function Draw-Label($Graphics, [string]$Text, [float]$X, [float]$Y, [float]$Width, [float]$Height, [float]$FontSize, [string]$HexColor) {
  $brush = [System.Drawing.SolidBrush]::new((New-Color $HexColor))
  $font = [System.Drawing.Font]::new('Segoe UI', $FontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $format = New-StringFormat -HorizontalAlignment Near -VerticalAlignment Near

  try {
    $rectangle = [System.Drawing.RectangleF]::new($X, $Y, $Width, $Height)
    $Graphics.DrawString($Text, $font, $brush, $rectangle, $format)
  }
  finally {
    $format.Dispose()
    $font.Dispose()
    $brush.Dispose()
  }
}

function Draw-TableHeader($Graphics, [float]$X, [float]$Y, [float]$Width, [float]$Height, [string]$FillColor, [string]$BorderColor, [string]$TextColor, [string]$Label) {
  $fillBrush = [System.Drawing.SolidBrush]::new((New-Color $FillColor))
  $borderPen = [System.Drawing.Pen]::new((New-Color $BorderColor), [single]2)
  $textBrush = [System.Drawing.SolidBrush]::new((New-Color $TextColor))

  try {
    Fill-RoundedRectangle -Graphics $Graphics -Brush $fillBrush -X $X -Y $Y -Width $Width -Height $Height -Radius 10
    Draw-RoundedRectangle -Graphics $Graphics -Pen $borderPen -X $X -Y $Y -Width $Width -Height $Height -Radius 10
    Draw-CenteredText -Graphics $Graphics -Text $Label -FontFamily 'Segoe UI Semibold' -FontSize 18 -FontStyle ([System.Drawing.FontStyle]::Bold) -Brush $textBrush -X ($X + 10) -Y ($Y + 2) -Width ($Width - 20) -Height ($Height - 4)
  }
  finally {
    $textBrush.Dispose()
    $borderPen.Dispose()
    $fillBrush.Dispose()
  }
}

function Draw-TableRow(
  $Graphics,
  [float]$X,
  [float]$Y,
  [float]$Width,
  [float]$Height,
  [float]$KeyWidth,
  [string]$KeyText,
  [string]$ValueText,
  [string]$KeyBackground,
  [string]$ValueBackground,
  [string]$TextColor
) {
  $keyBrush = [System.Drawing.SolidBrush]::new((New-Color $KeyBackground))
  $valueBrush = [System.Drawing.SolidBrush]::new((New-Color $ValueBackground))
  $strokePen = [System.Drawing.Pen]::new((New-Color '#425d77'), [single]1)
  $textBrush = [System.Drawing.SolidBrush]::new((New-Color $TextColor))
  $font = [System.Drawing.Font]::new('Consolas', 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $format = New-StringFormat -HorizontalAlignment Near -VerticalAlignment Center

  try {
    $Graphics.FillRectangle($keyBrush, $X, $Y, $KeyWidth, $Height)
    $Graphics.FillRectangle($valueBrush, $X + $KeyWidth, $Y, $Width - $KeyWidth, $Height)
    $Graphics.DrawRectangle($strokePen, $X, $Y, $Width, $Height)
    $Graphics.DrawString($KeyText, $font, $textBrush, ([System.Drawing.RectangleF]::new($X + 14, $Y, $KeyWidth - 20, $Height)), $format)
    $Graphics.DrawString($ValueText, $font, $textBrush, ([System.Drawing.RectangleF]::new($X + $KeyWidth + 14, $Y, $Width - $KeyWidth - 20, $Height)), $format)
  }
  finally {
    $format.Dispose()
    $font.Dispose()
    $textBrush.Dispose()
    $strokePen.Dispose()
    $valueBrush.Dispose()
    $keyBrush.Dispose()
  }
}

function Draw-Preview([string]$Path) {
  $bitmap = New-Object System.Drawing.Bitmap 1600, 900
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  $backgroundBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    ([System.Drawing.PointF]::new(0, 0)),
    ([System.Drawing.PointF]::new(1600, 900)),
    (New-Color '#09131f'),
    (New-Color '#18344f')
  )
  $overlayBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(30, 166, 221, 255))
  $panelShadowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(70, 3, 9, 18))
  $panelBrush = [System.Drawing.SolidBrush]::new((New-Color '#102033'))
  $panelHeaderBrush = [System.Drawing.SolidBrush]::new((New-Color '#13283f'))
  $panelBorderPen = [System.Drawing.Pen]::new((New-Color '#33506e'), [single]2)
  $headlineBrush = [System.Drawing.SolidBrush]::new((New-Color '#f4fbff'))
  $subtitleBrush = [System.Drawing.SolidBrush]::new((New-Color '#bdd7ea'))
  $titleFont = [System.Drawing.Font]::new('Segoe UI Black', 58, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $subtitleFont = [System.Drawing.Font]::new('Segoe UI', 28, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $bodyFont = [System.Drawing.Font]::new('Segoe UI', 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $monoFont = [System.Drawing.Font]::new('Consolas', 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $nearFormat = New-StringFormat -HorizontalAlignment Near -VerticalAlignment Near

  try {
    $graphics.FillRectangle($backgroundBrush, 0, 0, 1600, 900)
    $graphics.FillEllipse($overlayBrush, 1110, -80, 520, 320)
    $graphics.FillEllipse($overlayBrush, -150, 620, 430, 260)

    Draw-IconScene -Graphics $graphics -OriginX 82 -OriginY 86 -Size 148

    $graphics.DrawString('JSON Dump', $titleFont, $headlineBrush, ([System.Drawing.RectangleF]::new(255, 98, 390, 90)), $nearFormat)
    $graphics.DrawString("Interactive cfdump-style viewer`nfor JSON files and selections", $subtitleFont, $subtitleBrush, ([System.Drawing.RectangleF]::new(255, 190, 420, 120)), $nearFormat)

    Draw-Badge -Graphics $graphics -Text 'Selection or .json file' -X 82 -Y 315 -Width 220
    Draw-Badge -Graphics $graphics -Text 'Collapse nested nodes' -X 318 -Y 315 -Width 220
    Draw-Badge -Graphics $graphics -Text 'Natural / A-Z order' -X 554 -Y 315 -Width 182

    $graphics.DrawString("Open raw JSON in a focused dump panel, scan nested`nobjects and arrays quickly, then flip key ordering`nwithout leaving the viewer.", $bodyFont, $subtitleBrush, ([System.Drawing.RectangleF]::new(82, 392, 560, 150)), $nearFormat)

    $codeCardBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(110, 10, 22, 35))
    $codeCardPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(100, 120, 164, 206), [single]1.5)
    try {
      $sampleJson = @'
{
  "name": "sample-order",
  "count": 42,
  "active": true,
  "items": ["a", "b"]
}
'@
      Fill-RoundedRectangle -Graphics $graphics -Brush $codeCardBrush -X 82 -Y 560 -Width 520 -Height 220 -Radius 24
      Draw-RoundedRectangle -Graphics $graphics -Pen $codeCardPen -X 82 -Y 560 -Width 520 -Height 220 -Radius 24
      $graphics.DrawString($sampleJson, $monoFont, $headlineBrush, ([System.Drawing.RectangleF]::new(114, 606, 380, 150)), $nearFormat)
      Draw-CenteredText -Graphics $graphics -Text 'Raw JSON in, readable dump out' -FontFamily 'Segoe UI Semibold' -FontSize 22 -FontStyle ([System.Drawing.FontStyle]::Bold) -Brush $subtitleBrush -X 100 -Y 570 -Width 480 -Height 28
    }
    finally {
      $codeCardPen.Dispose()
      $codeCardBrush.Dispose()
    }

    $panelX = 760
    $panelY = 78
    $panelWidth = 760
    $panelHeight = 742

    Fill-RoundedRectangle -Graphics $graphics -Brush $panelShadowBrush -X ($panelX + 14) -Y ($panelY + 18) -Width $panelWidth -Height $panelHeight -Radius 30
    Fill-RoundedRectangle -Graphics $graphics -Brush $panelBrush -X $panelX -Y $panelY -Width $panelWidth -Height $panelHeight -Radius 30
    Draw-RoundedRectangle -Graphics $graphics -Pen $panelBorderPen -X $panelX -Y $panelY -Width $panelWidth -Height $panelHeight -Radius 30
    Fill-RoundedRectangle -Graphics $graphics -Brush $panelHeaderBrush -X $panelX -Y $panelY -Width $panelWidth -Height 72 -Radius 30

    Draw-CenteredText -Graphics $graphics -Text 'JSON Dump' -FontFamily 'Segoe UI Semibold' -FontSize 28 -FontStyle ([System.Drawing.FontStyle]::Bold) -Brush $headlineBrush -X ($panelX + 26) -Y ($panelY + 18) -Width 220 -Height 30
    Draw-Badge -Graphics $graphics -Text 'Natural' -X 1205 -Y 94 -Width 112
    Draw-Badge -Graphics $graphics -Text 'Sort A-Z' -X 1330 -Y 94 -Width 130

    Draw-TableHeader -Graphics $graphics -X 808 -Y 182 -Width 620 -Height 44 -FillColor '#264f78' -BorderColor '#3a7ab5' -TextColor '#dff3ff' -Label 'struct  -  4 keys'
    Draw-TableRow -Graphics $graphics -X 808 -Y 226 -Width 620 -Height 52 -KeyWidth 190 -KeyText 'name' -ValueText '"sample-order"' -KeyBackground '#1a3a52' -ValueBackground '#1e2d3d' -TextColor '#dff3ff'
    Draw-TableRow -Graphics $graphics -X 808 -Y 278 -Width 620 -Height 52 -KeyWidth 190 -KeyText 'count' -ValueText '42' -KeyBackground '#1a3a52' -ValueBackground '#1e2d3d' -TextColor '#dff3ff'
    Draw-TableRow -Graphics $graphics -X 808 -Y 330 -Width 620 -Height 52 -KeyWidth 190 -KeyText 'active' -ValueText 'YES' -KeyBackground '#1a3a52' -ValueBackground '#1e2d3d' -TextColor '#dff3ff'
    Draw-TableRow -Graphics $graphics -X 808 -Y 382 -Width 620 -Height 236 -KeyWidth 190 -KeyText 'items' -ValueText '' -KeyBackground '#1a3a52' -ValueBackground '#1e2d3d' -TextColor '#dff3ff'

    Draw-TableHeader -Graphics $graphics -X 1028 -Y 404 -Width 360 -Height 40 -FillColor '#5a4a00' -BorderColor '#a08000' -TextColor '#f8f3cf' -Label 'array  -  2 items'
    Draw-TableRow -Graphics $graphics -X 1028 -Y 444 -Width 360 -Height 48 -KeyWidth 78 -KeyText '0' -ValueText '"a"' -KeyBackground '#3a3000' -ValueBackground '#252013' -TextColor '#f8f3cf'
    Draw-TableRow -Graphics $graphics -X 1028 -Y 492 -Width 360 -Height 48 -KeyWidth 78 -KeyText '1' -ValueText '"b"' -KeyBackground '#3a3000' -ValueBackground '#252013' -TextColor '#f8f3cf'

    Draw-TableRow -Graphics $graphics -X 808 -Y 618 -Width 620 -Height 110 -KeyWidth 190 -KeyText 'meta' -ValueText '' -KeyBackground '#1a3a52' -ValueBackground '#1e2d3d' -TextColor '#dff3ff'
    Draw-TableHeader -Graphics $graphics -X 1028 -Y 640 -Width 280 -Height 40 -FillColor '#264f78' -BorderColor '#3a7ab5' -TextColor '#dff3ff' -Label 'struct  -  1 key'
    Draw-TableRow -Graphics $graphics -X 1028 -Y 680 -Width 280 -Height 38 -KeyWidth 112 -KeyText 'empty' -ValueText 'null' -KeyBackground '#1a3a52' -ValueBackground '#1e2d3d' -TextColor '#dff3ff'

    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $nearFormat.Dispose()
    $monoFont.Dispose()
    $bodyFont.Dispose()
    $subtitleFont.Dispose()
    $titleFont.Dispose()
    $subtitleBrush.Dispose()
    $headlineBrush.Dispose()
    $panelBorderPen.Dispose()
    $panelHeaderBrush.Dispose()
    $panelBrush.Dispose()
    $panelShadowBrush.Dispose()
    $overlayBrush.Dispose()
    $backgroundBrush.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
  }
}

function Draw-Icon([string]$Path) {
  $bitmap = New-Object System.Drawing.Bitmap 256, 256
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  try {
    Draw-IconScene -Graphics $graphics -OriginX 0 -OriginY 0 -Size 256
    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $graphics.Dispose()
    $bitmap.Dispose()
  }
}

if (-not (Test-Path -LiteralPath $OutputDirectory)) {
  New-Item -ItemType Directory -Path $OutputDirectory | Out-Null
}

$resolvedOutputDirectory = [System.IO.Path]::GetFullPath($OutputDirectory)
$iconPath = Join-Path $resolvedOutputDirectory 'icon.png'
$previewPath = Join-Path $resolvedOutputDirectory 'preview.png'

Draw-Icon -Path $iconPath
Draw-Preview -Path $previewPath

Write-Host "Generated marketplace assets:" -ForegroundColor Cyan
Write-Host " - $iconPath"
Write-Host " - $previewPath"