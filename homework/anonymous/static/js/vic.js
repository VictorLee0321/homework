/**
 * Created by victorlee on 17-4-3.
 */

$(document).ready(function() {

    $("#province").change(function() {
		var province = $("#province option:selected").text();
		loadUniversity(province)
	});

	$("#department").change(function() {
		var university = $("#university option:selected").text();
		var department = $("#department option:selected").text();
		loadClazz(university, department);
	});

    $("#university").change(function() {
		var university = $("#university option:selected").text();
		loadDepartment(university);
	});

	$("#department").change(function() {
		var university = $("#university option:selected").text();
		var department = $("#department option:selected").text();
		loadClazz(university, department);
	});

});

function loadUniversity(province) {
    $("#university").empty();
	$("#department").empty();
	$("#major").empty();
	$("#clazz").empty();
	console.log(province)
	$.ajax ({
		url : "/loadUniversity",
		type : "POST",
		dataType : "json",
		data : {"province":province},
		success : function(data) {
		    console.log(data)
			for (var i = 0; i < data.length; i++) {
				var university = data[i].university;
				$("#university").append("<option value='" + university + "'>" + university + "</option>");
			}
			var university = $("#university option:selected").text();
			loadDepartment(university);
		}
	});
}