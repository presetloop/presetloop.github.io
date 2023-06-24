<?php
// error_reporting(ALL);
// error_reporting(E_ERROR | E_WARNING | E_PARSE);
// ini_set("display_errors", 1);

// Set error reporting to a production level
// error_reporting(0);
// ini_set("display_errors", 0);

// header('Access-Control-Allow-Origin: http://presetloop.com');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include "DbConnect.php";
$objDb = new DbConnect;
$conn = $objDb->connect();

// Instantiate variables from samplepack form input fields
$title = $_POST['title'];
$linkTag = $_POST['linkTag'];
$imgHref = $_POST['imgHref'];
$info = $_POST['info'];

// $date = $_POST['date'];
// $sub_title = $_POST['sub_title'];
// $producer = $_POST['producer'];
// $genre = $_POST['genre'];
// $wildcard_1 = $_POST['wilcard_1'];
// $wildcard_2 = $_POST['wilcard_2'];
// $packPreviewUrl = $_POST['packPreviewUrl'];
// $sampleFileName_1 = $_POST['sampleFileName_1'];
// $sampleFileUrl_1 = $_POST['sampleFileUrl_1'];
// $sampleFileName_2 = $_POST['sampleFileName_2'];
// $sampleFileUrl_2 = $_POST['sampleFileUrl_2'];
// $sampleFileName_3 = $_POST['sampleFileName_3'];
// $sampleFileUrl_3 = $_POST['sampleFileUrl_3'];
// $sampleFileName_4 = $_POST['sampleFileName_4'];
// $sampleFileUrl_4 = $_POST['sampleFileUrl_4'];
// $sampleFileName_5 = $_POST['sampleFileName_5'];
// $sampleFileUrl_5 = $_POST['sampleFileUrl_5'];
// $sampleFileName_6 = $_POST['sampleFileName_6'];
// $sampleFileUrl_6 = $_POST['sampleFileUrl_6'];
// $sampleFileName_7 = $_POST['sampleFileName_7'];
// $sampleFileUrl_7 = $_POST['sampleFileUrl_7'];
// $sampleFileName_8 = $_POST['sampleFileName_8'];
// $sampleFileUrl_8 = $_POST['sampleFileUrl_8'];
// $sampleFileName_9 = $_POST['sampleFileName_9'];
// $sampleFileUrl_9 = $_POST['sampleFileUrl_9'];
// $sampleFileName_10 = $_POST['sampleFileName_10'];
// $sampleFileUrl_10 = $_POST['sampleFileUrl_10'];
// $sampleFileName_11 = $_POST['sampleFileName_11'];
// $sampleFileUrl_11 = $_POST['sampleFileUrl_11'];
// $sampleFileName_12 = $_POST['sampleFileName_12'];
// $sampleFileUrl_12 = $_POST['sampleFileUrl_12'];
// $sampleFileName_13 = $_POST['sampleFileName_13'];
// $sampleFileUrl_13 = $_POST['sampleFileUrl_13'];
// $sampleFileName_14 = $_POST['sampleFileName_14'];
// $sampleFileUrl_14 = $_POST['sampleFileUrl_14'];
// $sampleFileName_15 = $_POST['sampleFileName_15'];
// $sampleFileUrl_15 = $_POST['sampleFileUrl_15'];
// $sampleFileName_16 = $_POST['sampleFileName_16'];
// $sampleFileUrl_16 = $_POST['sampleFileUrl_16'];


// $title === null || $title === ""
if ( empty($title) || empty($info) ) {
  $response = array('success' => false, 'error' => 'Title and info are required fields.');
  // header('Content-Type: application/json');
  echo json_encode($response);
  exit;
}

// $title = htmlspecialchars_decode(htmlspecialchars($title, ENT_QUOTES), ENT_QUOTES | ENT_HTML5);
// --- htmlspecialchars_decode apparently not needed -> test to prove ---

// Sanitize input data against XSS attack but preserve the text format
$title = htmlspecialchars($title, ENT_QUOTES | ENT_HTML5);
$linkTag = htmlspecialchars($linkTag, ENT_QUOTES | ENT_HTML5);
$imgHref = htmlspecialchars($imgHref, ENT_QUOTES | ENT_HTML5);
$info = htmlspecialchars(nl2br($info), ENT_QUOTES | ENT_HTML5);
//      ^^^^^^^^^preseve line breaks

// $date = htmlspecialchars($date, ENT_QUOTES | ENT_HTML5);
// $sub_title = htmlspecialchars($sub_title, ENT_QUOTES | ENT_HTML5);
// $producer = htmlspecialchars($producer, ENT_QUOTES | ENT_HTML5);
// $genre = htmlspecialchars($genre, ENT_QUOTES | ENT_HTML5);
// $wilcard_1 = htmlspecialchars($wildcard_1, ENT_QUOTES | ENT_HTML5);
// $wilcard_2 = htmlspecialchars($wildcard_2, ENT_QUOTES | ENT_HTML5);
// $packPreviewUrl = htmlspecialchars($packPreviewUrl, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_1 = htmlspecialchars($sampleFileName_1, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_1 = htmlspecialchars($sampleFileUrl_1, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_2 = htmlspecialchars($sampleFileName_2, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_2 = htmlspecialchars($sampleFileUrl_2, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_3 = htmlspecialchars($sampleFileName_3, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_3 = htmlspecialchars($sampleFileUrl_3, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_4 = htmlspecialchars($sampleFileName_4, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_4 = htmlspecialchars($sampleFileUrl_4, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_5 = htmlspecialchars($sampleFileName_5, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_5 = htmlspecialchars($sampleFileUrl_5, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_6 = htmlspecialchars($sampleFileName_6, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_6 = htmlspecialchars($sampleFileUrl_6, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_7 = htmlspecialchars($sampleFileName_7, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_7 = htmlspecialchars($sampleFileUrl_7, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_8 = htmlspecialchars($sampleFileName_8, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_8 = htmlspecialchars($sampleFileUrl_8, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_9 = htmlspecialchars($sampleFileName_9, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_9 = htmlspecialchars($sampleFileUrl_9, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_10 = htmlspecialchars($sampleFileName_10, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_10 = htmlspecialchars($sampleFileUrl_10, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_11 = htmlspecialchars($sampleFileName_11, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_11 = htmlspecialchars($sampleFileUrl_11, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_12 = htmlspecialchars($sampleFileName_12, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_12 = htmlspecialchars($sampleFileUrl_12, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_13 = htmlspecialchars($sampleFileName_13, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_13 = htmlspecialchars($sampleFileUrl_13, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_14 = htmlspecialchars($sampleFileName_14, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_14 = htmlspecialchars($sampleFileUrl_14, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_15 = htmlspecialchars($sampleFileName_15, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_15 = htmlspecialchars($sampleFileUrl_15, ENT_QUOTES | ENT_HTML5);
// $sampleFileName_16 = htmlspecialchars($sampleFileName_16, ENT_QUOTES | ENT_HTML5);
// $sampleFileUrl_16 = htmlspecialchars($sampleFileUrl_16, ENT_QUOTES | ENT_HTML5);

// prepare and execute SQL statement to insert data into MySQL database
try {
  $stmt = $conn->prepare("INSERT INTO samplepack (title, linkTag, imgHref, info");
  // , date, sub_title, producer, genre, wildcard_1, wildcard_2, packPreviewUrl, sampleFileName_1, sampleFileUrl_1, sampleFileName_2, sampleFileUrl_2, sampleFileName_3, sampleFileUrl_3, sampleFileName_4, sampleFileUrl_4, sampleFileName_5, sampleFileUrl_5, sampleFileName_6, sampleFileUrl_6, sampleFileName_7, sampleFileUrl_7, sampleFileName_8, sampleFileUrl_8, sampleFileName_9, sampleFileUrl_9, sampleFileName_10, sampleFileUrl_10, sampleFileName_11, sampleFileUrl_11, sampleFileName_12, sampleFileUrl_12, sampleFileName_13, sampleFileUrl_13, sampleFileName_14, sampleFileUrl_14, sampleFileName_15, sampleFileUrl_15, sampleFileName_16, sampleFileUrl_16,VALUES (:title, :linkTag, :imgHref, :info, :date, :sub_title, :producer, :genre, :wildcard_1, :wildcard_2, :packPreviewUrl, :sampleFileName_1, :sampleFileUrl_1, :sampleFileName_2, :sampleFileUrl_2, :sampleFileName_3, :sampleFileUrl_3, :sampleFileName_4, :sampleFileUrl_4, :sampleFileName_5, :sampleFileUrl_5, :sampleFileName_6, :sampleFileUrl_6, :sampleFileName_7, :sampleFileUrl_7, :sampleFileName_8, :sampleFileUrl_8, :sampleFileName_9, :sampleFileUrl_9, :sampleFileName_10, :sampleFileUrl_10, :sampleFileName_11, :sampleFileUrl_11, :sampleFileName_12, :sampleFileUrl_12, :sampleFileName_13, :sampleFileUrl_13, :sampleFileName_14, :sampleFileUrl_14, :sampleFileName_15, :sampleFileUrl_15, :sampleFileName_16, :sampleFileUrl_16)

  $stmt->bindParam(':title', $title);
  $stmt->bindParam(':linkTag', $linkTag);
  $stmt->bindParam(':imgHref', $imgHref);
  $stmt->bindParam(':info', $info);
  
  // $stmt->bindParam(':date', $date);
  // $stmt->bindParam(':sub_title', $sub_title);
  // $stmt->bindParam(':producer', $producer);
  // $stmt->bindParam(':genre', $genre);
  // $stmt->bindParam(':wildcard_1', $wildcard_1);
  // $stmt->bindParam(':wildcard_2', $wildcard_2);
  // $stmt->bindParam(':packPreviewUrl', $packPreviewUrl);
  // $stmt->bindParam(':sampleFileName_1', $sampleFileName_1);
  // $stmt->bindParam(':sampleFileUrl_1', $sampleFileUrl_1);
  // $stmt->bindParam(':sampleFileName_2', $sampleFileName_2);
  // $stmt->bindParam(':sampleFileUrl_2', $sampleFileUrl_2);
  // $stmt->bindParam(':sampleFileName_3', $sampleFileName_3);
  // $stmt->bindParam(':sampleFileUrl_3', $sampleFileUrl_3);
  // $stmt->bindParam(':sampleFileName_4', $sampleFileName_4);
  // $stmt->bindParam(':sampleFileUrl_4', $sampleFileUrl_4);
  // $stmt->bindParam(':sampleFileName_5', $sampleFileName_5);
  // $stmt->bindParam(':sampleFileUrl_5', $sampleFileUrl_5);
  // $stmt->bindParam(':sampleFileName_6', $sampleFileName_6);
  // $stmt->bindParam(':sampleFileUrl_6', $sampleFileUrl_6);
  // $stmt->bindParam(':sampleFileName_7', $sampleFileName_7);
  // $stmt->bindParam(':sampleFileUrl_7', $sampleFileUrl_7);
  // $stmt->bindParam(':sampleFileName_8', $sampleFileName_8);
  // $stmt->bindParam(':sampleFileUrl_8', $sampleFileUrl_8);
  // $stmt->bindParam(':sampleFileName_9', $sampleFileName_9);
  // $stmt->bindParam(':sampleFileUrl_9', $sampleFileUrl_9);
  // $stmt->bindParam(':sampleFileName_10', $sampleFileName_10);
  // $stmt->bindParam(':sampleFileUrl_10', $sampleFileUrl_10);
  // $stmt->bindParam(':sampleFileName_11', $sampleFileName_11);
  // $stmt->bindParam(':sampleFileUrl_11', $sampleFileUrl_11);
  // $stmt->bindParam(':sampleFileName_12', $sampleFileName_12);
  // $stmt->bindParam(':sampleFileUrl_12', $sampleFileUrl_12);
  // $stmt->bindParam(':sampleFileName_13', $sampleFileName_13);
  // $stmt->bindParam(':sampleFileUrl_13', $sampleFileUrl_13);
  // $stmt->bindParam(':sampleFileName_14', $sampleFileName_14);
  // $stmt->bindParam(':sampleFileUrl_14', $sampleFileUrl_14);
  // $stmt->bindParam(':sampleFileName_15', $sampleFileName_15);
  // $stmt->bindParam(':sampleFileUrl_15', $sampleFileUrl_15);
  // $stmt->bindParam(':sampleFileName_16', $sampleFileName_16);
  // $stmt->bindParam(':sampleFileUrl_16', $sampleFileUrl_16);

  $stmt->execute();
  $response = array('success' => true);
} catch(PDOException $e) {
    $response = array('success' => false, 'error' => 'Database insert failed');
     // Log the specific error message for debugging purposes
    // $response['error'] = 'Database insert failed: ' . $e->getMessage();
}

// close the prepared statement and database connection
$stmt = null;
$conn = null;

// send response and preserve link / img href syntax
echo json_encode($response, JSON_UNESCAPED_SLASHES);