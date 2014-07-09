var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description
	});

	$(".tabs a span").toArray().forEach(function (element) {
		var $element = $(element);

		// create a link handle for this element
		$element.on("click", function () {			
			var $content,
				$input,
				$button,
				i;

			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for(i = toDos.length-1; i >= 0; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
			} else if ($element.parent().is(":nth-child(3)")) {
				// this is the tag tab code
				console.log("the tags tab was clicked!");
			} else if ($element.parent().is(":nth-child(4)")) {
				$input = $("<input>");
				$button = $("<button>").text("+");

				$button.on("click", function() {
					if ($input.val() != "") {
						toDos.push($input.val());
						$input.val("");
					}
				});

				$content = $("<div>").append($input).append($button);
			}

			$("main .content").append($content);

			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});