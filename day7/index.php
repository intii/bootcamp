<?php 
    $title = "HTML5 Practice";
    $subtitle = "Day 4";
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title><?php echo "$title: $subtitle"; ?></title>
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.css" />
        <script data-main="modules/main.js" src="scripts/require.js"></script>
    </head>
    <body>
        <header>
            <h1><?php echo "<span class='title'>$title</span>: <span class='subtitle'>$subtitle</span>"; ?></h1>
        </header>

        <!-- add your content here -->
        <h3>-- Enjoy! --</h3>
        <div id="dialog"></div>
        <a href='dialogQuote.html' data-rel='dialog' id="dial"> Quote!</a>
        <footer>
            <div><?php echo $title; ?> v1.0</div>
            <div>@author Alberto Miranda <a href="mailto:alberto@nextive.com">&lt;alberto@nextive.com&gt;</a></div>
            <div>@author Esteban Abait <a href="mailto:esteban.abait@nextive.com">&lt;esteban.abait@nextive.com&gt;</a></div>
        </footer>  
    </body>
</html>