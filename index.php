<!DOCTYPE html>
<html>
  <head>
    <title>import.io test</title>

    <meta charset="UTF-8">
    <meta name="description" content="beschrijving">
    <meta name="keywords" content="keywords">
    <meta name="author" content="Koele mensen">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <!--Open Graph data-->
    <meta property="og:url" content="url">
    <meta property="og:type" content="article">
    <meta property="og:title" content="titel">
    <meta property="og:description" content="beschrijving">
    <meta property="og:image" content="afbeelding">
    <!--Twitter card-->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="url">
    <meta name="twitter:creator" content="@twitternaam">
    <meta name="twitter:title" content="titel">
    <meta name="twitter:description" content="beschrijving">
    <meta name="twitter:image" content="afbeelding">

    <!--jQuery 2.1.4-->
    <script src="js/jquery.js"></script>

    <!--Shortcut icon-->
    <link rel="shortcut icon" href="images/icons/favicon.png">

    <!--Apple stuff-->
    <link rel="apple-touch-icon" href="images/icons/apple-touch-icon.png">

    <!--CSS implementation-->
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/home.css">

    <!--JavaScript implementation-->
    <script type="text/javascript" src="js/search.js"></script>
    <script type="text/javascript" src="js/main.js"></script>

  </head>
  <body>

    <section class="search">
      <form>
        <input class="search-input" type="text" placeholder="Search for items...">
        <input type="submit" value="Search">
      </form>
    </section>
    <aside class="filters">
      <h1>Filter:</h1>
      <section class="group">
        <h3>Price:</h3>
        <span class="opt-1 selected" data-execute="sortPrice(true)">Cheap to expensive</span>
        <span class="opt-2" data-execute="sortPrice(false)">Expensive to cheap</span>
      </section>
      <section class="group sortonprice">
        <h3>Price (minimum, maximum):</h3>
        <p class="input-content">
          From <input class="min" type="number" name="Minimum" placeholder="0"> to <input class="max" type="number" name="Maximum" placeholder=""><button type="button">Go</button>
        </p>
      </section>
    </aside>
    <section class="product-container"></section>
    <section class="loading">
      <div class="container">
        <img class="loading-icon" src="images/icons/loading.gif" alt="Loading icon"/>
      </div>
    </section>

  </body>
</html>
