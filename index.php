<?php
    include 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />    
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>$title</title>
	<!-- HTML attributed to http://www.script-tutorials.com/html5-audio-player-with-playlist/ -->
    <!-- add styles and scripts -->
    <link href="css/styles.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <?php            
        $album = htmlspecialchars($_GET["album"]);
        $musicroot = "music";
    ?>
</head>
<body>
    <header>
        <h2><?=$title?></h2>
        <h3 style="text-align:center"><?=$message?></h3>
    </header>
    <div class="example">
        <div class="player">
            <div class="pl"></div>
            <div class="title"></div>
            <div class="artist"></div>
            <div class="cover">Autoplay<input type="checkbox" class="autoplay" checked></div>
            <div class="controls">
                <div class="play"></div>
                <div class="pause"></div>
                <div class="rew"></div>
                <div class="fwd"></div>
            </div>
            <div class="volume"></div>
            <div class="time"></div>
            <div class="tracker"></div>
        </div>      
        
        <?php
            // show catalog if no album supplied
            if(empty($album)){
               $albums = array_filter(glob($musicroot . "/*"), 'is_dir');
               echo '<h3>Album Catalog</h3>';
               echo '<ul>';
               foreach($albums as $album){          
                   $thisalbum = basename($album);         
                   echo "<li><a href=\"?album=$thisalbum\">" . $thisalbum . "</a></li>";
               } 
               echo '</ul>';
            }else{
                // display track list
                echo'<ul class="playlist">';
       			
                // id3 support would be cool, but lets keep things really simple
                
                $songs = glob($musicroot . "/" . $album . "/" . "*.mp3");
                foreach($songs as $song){				
                    $displaySong = htmlentities(basename($song));				
                    echo '<li audiourl="' . $song . '" cover="" artist="">' . $displaySong . '</li>' . "\n";
                }
                echo '</ul>';
            }
        ?>        
    </div>
</body>
</html>