<h1 class="page-title"><?php echo isset($page_title) ? $page_title : 'Page Heading'; ?></h1>

<div class="row">
    <div class="col-12">
        <p class="error-info">
            Sorry, the requested page could not found !
        </p>
        <a href="<?php echo base_url($this->router->directory);?>" class="btn btn-outline-primary my-4"><i class="fa fa-fw fa-home" aria-hidden="true"></i> Go back to home page</a>
    </div>
</div>