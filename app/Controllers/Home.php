<?php

namespace App\Controllers;

class Home extends BaseController
{
	public function index() {
	  $data = ['page_title' => 'Roxter',];
      echo view('tpl/header');
      echo view('tpl/nav');
      echo view('page', $data);
      echo view('tpl/footer');  
	}
	public function sitemap() {
	  $data = ['page_title' => 'Roxter',];
      echo view('sitemap', $data);
	}
	public function about() {
	  $data = ['page_title' => 'Roxter',];
	  echo view('tpl/header');
      echo view('tpl/nav');
      echo view('about', $data);
    //  echo view('tpl/footer'); 
	}
}
