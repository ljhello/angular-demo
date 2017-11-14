
var app=angular.module('myapp',[]);

app.controller('democontroller',['$scope','$timeout',function($scope,$timeout){

    $scope.items=[
        {id:1,name:"电脑",status:0},
        {id:2,name:"手机",status:0},
        {id:3,name:"手表",status:0},
        {id:4,name:"鼠标",status:0},
        {id:5,name:"500元充值卡",status:0},
        {id:6,name:"键盘",status:0}
    ];

    $scope.result="奖品为空";

    $scope.getdom=function(id){
        return document.getElementById(id);
    }

    $scope.showhide=function(pre,nex){
        pre='step'+pre;
        nex='step'+nex;
        $scope.getdom(pre).style.display="none";
        $scope.getdom(nex).style.display="block";

    }


    //开始抽奖
    $scope.start=function(){
        
        $scope.showhide(1,2);
        var circle=5;
        var selkey=Math.floor(Math.random()*$scope.items.length);

        var next=function(key){

            $scope.items[key].status=true;
            if((key-1)>=0){
                $scope.items[key-1].status=false;
            }
            if(key==0){
                $scope.items[$scope.items.length-1].status=false;
            }

            var timer=$timeout(function(){

                if(circle<=0 && selkey==key){

                    $scope.showhide(2,3);

                    $scope.result=$scope.items[key].name;

                    return;
                }
    
              if($scope.items.length==key+1){
                  circle--;
              }  
    
              if($scope.items[key+1]){
                  next(key+1);
              }else{
                  next(0);
              }
    
    
            },120)

        }

     
      next(0);
        

    }
    
  
//前进或者返回

 $scope.reset=function(){
    $scope.showhide(3,1);
 }
  
$scope.edit=function(){
    $scope.showhide(3,4);
}




//修改奖品

$scope.name=""

  $scope.add=function(){

    var lastid=this.lastid();

    $scope.items.push({
        id:lastid,
        name:$scope.name,
        status:0
    })
   
    $scope.name=""



  }


$scope.del=function(id){
    angular.forEach($scope.items,function(value,key){
         if(id==value.id){
            $scope.items.splice(key,1);
         }
    })
}


$scope.return=function(){
    $scope.showhide(4,3)
}


//获取最后一个奖品的id值
$scope.lastid=function(id){
    var id=0;
    angular.forEach($scope.items,function(value,key){
      if(id<value.id){
        id=value.id
      }
    })

    return ++id;
  }


}])