<?php header('Content-type: application/xml; charset=utf-8') ?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>' ?>

<sitemapindex xmlns="http://www.google.com/schemas/sitemap/0.84" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84 http://www.google.com/schemas/sitemap/0.84/siteindex.xsd">

  <sitemap>
    <loc>http://roxter.us/sitemap.php?</loc>
  </sitemap>
<?= view('tpl/footer') ?>

</sitemapindex>

<?= view('tpl/footer') ?>
