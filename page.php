<?php 
session_start();


$stepToRoot = '../';
$pageTitle = 'Sirimazone | Home of Movie Downloads and Entertainment';

require './classes/Dbase.php';
require './classes/Content.php';

 $database = new Dbase();
 $db = $database->connect();
 $content = new Content($db);



//getting the request uri of the page
$reqUri = $_SERVER['REQUEST_URI'];

//break the reqUri into parts
$expUri = explode("/", $reqUri);

//get the last part of the URI
$lstUri = $expUri[count($expUri) - 1];
$querysign = '?';
//confirm the existence of a '?' in the last part of the URI
$qsPos = strpos($lstUri, $querysign);


 $publishedPostsStatement = $content->getPublishedContentPost();

 $publishedPosts = $publishedPostsStatement->fetchAll();

 $resultsPerPage = 18;

 $uploadDir = "../uploadz/";

require_once './temp/header.php'; 


if($publishedPosts != null) {

	//get the current number for get method
	$gottenPageNum = $_GET['page'];

	$numberOfResults = count($publishedPosts);

	$numberOfPages = ceil($numberOfResults / $resultsPerPage);

	//get the limit starting number for results
	$startingLimitNumber = ($gottenPageNum - 1) * $resultsPerPage;

	if (isset($_GET['page']) && $qsPos == true || $lstUri != $gottenPageNum) {
		//redirect to 404
	header('Location: ../404');

} else if ($gottenPageNum > 0 && $gottenPageNum <= $numberOfPages) {

	if ($gottenPageNum == 1) {
		header('Location: ../');

	}


?>

	<div class="all-posts">

		<?php



			$limitedPublishedPosts = $content->getPublishedContentPostWithLimit($startingLimitNumber, $resultsPerPage);



			foreach ($limitedPublishedPosts as $publishedPost) {
				$timeStamp = $publishedPost['created_at'];
			?>

			<div class="single-post">
				<div class="cover-image-wrap">
					<a href="<?php echo '../contents/' . $publishedPost['content_slug']; ?>"><img width="250px" src="<?php echo $uploadDir.$publishedPost['content_cover_image']; ?>" alt="<?php echo $publishedPost['content_cover_image_alt']; ?>"></a>
				</div>
				<div class="brief-details">
					<h4><a href="<?php echo '../contents/' . $publishedPost['content_slug']; ?>"><?php echo $publishedPost['content_title']; ?></a></h4>
					<p><small><i class="fas fa-calendar-alt"></i> <?php echo date('M j, Y', $timeStamp); ?> </small> <small><a href="<?php echo '../category/'. strtolower($publishedPost['content_category']).'/1'; ?>"><i class="fas fa-folder-open"></i> <?php echo $publishedPost['content_category']; ?></a></small></p>
				</div>
			</div>

			<?php

			}

		?>



	</div>

		<?php 

			//pagination

			//array to store pagination number
			$pagArr = array();

			for ($page = 1; $page <= $numberOfPages; $page++) {

				if($page == 1) {
					array_push($pagArr, '<a href="../">'. $page .'</a> ');
				}else {

					if($page == $gottenPageNum) {

						array_push($pagArr, '<a href="./'. $page. '"  class="active-pag-no">'. $page .'</a> ');

					} else {

						switch ($page) {
							case 2:
							case 3:
							case 4:
							case ($gottenPageNum+1):
							case ($gottenPageNum-1):
							case ($gottenPageNum+2):
							case ($gottenPageNum-2):
							case 10:
							case 20:
							case 30:

								# code...
						array_push($pagArr, ' <a href="./'. $page. '">'. $page .'</a> ');
								break;
								
							default:
							if($pagArr[(count($pagArr)-1)] != '.' || $pagArr[(count($pagArr)-2)] != '.' || $pagArr[(count($pagArr)-3)] != '.'){
								array_push($pagArr, '.');

							}
								# code...
								break;
						}


					}
				}
			}



			?>

		<div class="pagination-wrapper">
			<div>
				
			<?php
			


			echo '<span class="page-num-info">Page '. $gottenPageNum .' of '. $numberOfPages .'</span> ';
			if($gottenPageNum == 2) {
				echo ' <span><a href="../" title="previous"><i class="fas fa-angle-double-left"></i></a></span> ';

			} else {
				echo ' <span><a href="./'. ($gottenPageNum - 1) .'" title="previous"><i class="fas fa-angle-double-left"></i></a></span> ';

			}

			foreach ($pagArr as $arr) {
				echo $arr;
			}

			if($gottenPageNum == $numberOfPages) {
				echo ' <span class="not-allowed-page-num" style="cursor: not-allowed;"><i class="fas fa-angle-double-right"></i></span>';
			} else {
				echo ' <span><a href="./'. ($gottenPageNum + 1) .'" title="next"><i class="fas fa-angle-double-right"></i></a></span>';
			}


			echo ' <span class="last-page-num"><a href="./'. $numberOfPages .'">Last</a></span>';


			?>

			</div>

		</div>

			<?php


		} else {
			header('Location: ../404');
		}

} else {
	echo '<p>No content yet.</p>';
}

		?>
                
<?php 

require_once './inc/extraFooter.php';

require_once './temp/footer.php'; 

?>