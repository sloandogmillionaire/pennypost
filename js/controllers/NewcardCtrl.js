pennyPost.controller('NewcardCtrl',function($scope){
	$scope.hello = "heeeeeyyyyyy";
	$scope.images = [{url:'http://www.bioexpedition.com/wp-content/uploads/2012/04/Racoon-Cub.jpg'},
		{url:'http://www.bioexpedition.com/wp-content/uploads/2012/04/Racoon-Cub.jpg'},
		{url:'http://www.bioexpedition.com/wp-content/uploads/2012/04/Racoon-Cub.jpg'},
		{url:'http://www.bioexpedition.com/wp-content/uploads/2012/04/Racoon-Cub.jpg'},
		{url:'http://www.bioexpedition.com/wp-content/uploads/2012/04/Racoon-Cub.jpg'}];
  $scope.photoSet = false;
  $scope.flippin = function(){
    console.log('heeeeeyyyyyy');
    $scope.photoSet = !$scope.photoSet;
  }
});
