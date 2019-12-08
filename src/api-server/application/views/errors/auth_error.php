<h1 class="page-title"><?php echo isset($page_title) ? $page_title : 'Page Heading'; ?></h1>

<div class="row">
    <div class="col-12">
        <p class="error-info">We're sorry! You are not authorized to access the link or page you are trying to access. Your session has been terminated forcefully.</p>
        <a href="<?php echo base_url($this->router->directory.'user/login');?>" class="btn btn-outline-outline-primary">Please login to continue</a>
    </div>
</div>