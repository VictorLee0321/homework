/**
 * Created by yuanzi on 2016/4/6.
 */
/*function createXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		// Mozilla
		xhr = new XMLHttpRequest();
	} else {
		// IE
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
				}
			}
		}
	}
}*/

/*function checkStudent(studentID, name) {
	createXMLHttpRequest();
	if (null != xhr) {
		xhr.open("GET", "upload2?studentID=" + studentID + "&name=" + name);
		xhr.send(null);
		xhr.onreadystatechange = function() {
			// alert("readyState" + xhr.readyState);
			if (4 == xhr.readyState) {
				if (200 == xhr.status) {
					var responseText = xhr.responseText;
					// alert("callback responseText" + responseText);
					if (1 == responseText) {
						document.getElementById('tipsdiv').style.display = 'none';
						uploadFile();
					} else {
						document.getElementById('tipsdiv').style.display = 'block';
						document.getElementById('tips').innerHTML = '学号姓名不匹配';
					}
				}
			}
		};
	} else {
		document.getElementById('tipsdiv').style.display = 'block';
		document.getElementById('tips').innerHTML = '服务器宕机或浏览器出错，请重试';
	}
}*/

/*function uploadFile() {
	var fd = new FormData();
	fd.append("file", document.getElementById('file').files[0]);
	// var xhr = new XMLHttpRequest();
	createXMLHttpRequest();
	xhr.upload.addEventListener("progress", uploadProgress, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);
	xhr.open("POST", "upload2");
	// xhr.setRequestHeader("Content-type",
	// "application/x-www-form-urlencoded"); can't have
	xhr.send(fd);
}*/

/*function uploadProgress(evt) {
	if (evt.lengthComputable) {
		// for slowly not * 100;
		var percentComplete = Math.round(evt.loaded * 99 / evt.total);
		document.getElementById('progressMain').style.display = 'block';
		document.getElementById('progressBar').style.width = percentComplete
				.toString()
				+ '%';
	} else {
	}
}

function uploadComplete(evt) {
	 This event is raised when the server send back a response 
	 alert(evt.target.responseText); 
	document.getElementById('progressBar').style.width = '100%';
	// alert("upload success !");
	document.getElementById('progressMain').style.display = 'none';
	document.getElementById('tipsdiv').style.display = 'block';
	document.getElementById('tips').innerHTML = '上传成功';
}

function uploadFailed(evt) {
	alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
	alert("The upload has been canceled by the user or the browser dropped the connection.");
}*/

/*$(document)
		.ready(
				function() {
							$("input[type=\"file\"]").on(
									"change",
									function() {
										$("#fileName").html(
												this.value.split("\\").pop());
										$("#tipsdiv").css('display', 'none');
									}),
							$(".class")
									.click(
											function() {
												$("#tipsdiv").css('display',
														'none');
												var chose = $(this).text();
												$(".btn")
														.html(
																chose
																		+ "<span class=\"caret\"></span>");
												var scale;
												switch (chose) {
												case "MIS":
													scale = "2013213143xx-姓名-管理信息系统-实验X";
													break;
												case "Java":
													scale = "2013213143xx-姓名-java应用技术-实验X";
													break;
												default:
													break;
												}
												$("#scale").html(scale);
												$(this).dropdown("toggle");
												return false;
											}),
							$("#btn_upload")
									.click(
											function() {
												if ($("#scale").html() == '') {
													$("#tipsdiv").css(
															'display', 'block');
													$("#tips").html('请选择课程');
													return false;
												}
												if (($("#fileName").html() == '上传文件名')
														|| ($("#fileName")
																.html() == '')) {
													$("#tipsdiv").css(
															'display', 'block');
													$("#tips").html('请选择上传文件');
													return false;
												}
												var name = $("#fileName")
														.text().split(".")[0];
												var reg1 = /2013213143[0-3]\d\-[\u4E00-\u9FA5]{2,4}\-管理信息系统\-实验(一|二|三|四|五|六|七|八|九|十)/;
												var reg2 = /2013213143[0-3]\d\-[\u4E00-\u9FA5]{2,4}\-java应用技术\-实验(一|二|三|四|五|六|七|八|九|十)/;
												var flag1 = ($("#scale").html() == "2013213143xx-姓名-管理信息系统-实验X")
														&& (!reg1.test(name));
												var flag2 = ($("#scale").html() == "2013213143xx-姓名-java应用技术-实验X")
														&& (!reg2.test(name));
												if (flag1 || flag2) {
													$("#tipsdiv").css(
															'display', 'block');
													$("#tips").html('请正确命名');
													return false;
												}
												if (document
														.getElementById('file').files[0].size > 20 * 1024 * 1024) {
													$("#tipsdiv").css(
															'display', 'block');
													$("#tips").html(
															'请选择小于20M的文件');
													return false;
												}
												var studentID = name.split("-")[0];
												var studentName = name
														.split("-")[1];
												checkStudent(studentID,
														studentName);
											});
				});*/