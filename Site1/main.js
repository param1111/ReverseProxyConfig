$(function (){
	var order = $("#dataTable");
	var $name = $("#inputName");
	var $age = $("#inputAge");
	var $gender = $("#inputGender");
	var $company = $("#inputCompany");
	var $email = $("#inputEmail");
	var $phone = $("#inputPhone");
	var orderTemplate = $("#data-template").html();
	function dataOrder(orders){
		order.append(Mustache.render(orderTemplate,orders));/*Passing Template and Object*/
	}
	$.ajax({
		type: 'GET',
		url:"http://localhost:8080/employee",
		success:function(data){
			$.each(data, function(i,orders){
				dataOrder(orders);
			});
		},
		error:function(){
			alert("Error loading Data");
		}
	});
	$("#add").on("click",function(){
		var newOrder = {
			name: $name.val(),
			age: $age.val(),
			gender: $gender.val(),
			company: $company.val(),
			email: $email.val(),
			phone: $phone.val(),
		};
		$.ajax({
			type: 'POST',
			url:"http://localhost:8080/employee",
			data: newOrder,
			success:function(addOrder){
				dataOrder(addOrder);
			},
			error:function(){
				alert("Error Posting");
			}
		});

	});
	order.delegate(".remove" , "click",function(){  /*it will listen to any click events on order things,fires only when its part of remove class*/
		var $li= $(this).closest('li');				/*Refers to the remove button that is clicked*/
		
		$.ajax({
			type: 'DELETE',
			url:"http://localhost:8080/employee/" + $(this).attr("data-id"),/*Getting/grabbing the attribute out*/
			success:function(){
				$li.remove();
			},
			error:function(){
				alert("Error Deleting Data");
			}			
		});

		});
	order.delegate(".editData" , "click",function(){
		var $li= $(this).closest('li');
		$li.find("input.name").val($li.find("span.name").html());
		$li.find("input.age").val($li.find("span.age").html());
		$li.addClass("edit");
	});

	order.delegate(".cancelData" , "click",function(){
		$(this).closest('li').removeClass("edit");
	});

	order.delegate(".saveEdit" , "click",function(){
		var $li= $(this).closest('li');
		var order1 = {
			name:$li.find("input.name").val(),
			age:$li.find("input.age").val(),
			gender:$li.find("input.gender").val(),
			company:$li.find("input.company").val(),
			email:$li.find("input.email").val(),
			phone:$li.find("input.phone").val()
		};
		$.ajax({
			type:'PUT',
			url:"http://localhost:8080/employee/" + $li.attr("data-id"),
			data:order1,
			success:function(addOrder){
				$li.find("span.name").html(order1.name);
				$li.find("span.age").html(order1.age);
				$li.find("span.gender").html(order1.gender);
				$li.find("span.company").html(order1.company);
				$li.find("span.email").html(order1.email);
				$li.find("span.phone").html(order1.phone);
				$li.removeClass("edit");
			},
			error:function(){
				alert("Error updating");
			}


		});
	});
		
		
		


});