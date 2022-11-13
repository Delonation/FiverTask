const data = {
	question: [
		{
			id: 1,
			Sentence: "My name is Delonation.",
			sub: ["name"],
			verb: ["is"],
			obj: ["Delonation."],
		},
		{
			id: 2,
			Sentence: "My age is 25 and I am very young.",
			sub: ["My", "age"],
			verb: ["and"],
			obj: ["25"],
		},
		{
			id: 3,
			Sentence: "My age is 25 and I am very young.",
			sub: [],
			verb: [],
			obj: ["am", "very"],
		},
	],
};

// var qNo = document.getElementById("qNo");
var qBody = document.getElementById("questions");
var currentQuestion = 0;
var totalQuestions;
var countS = 0;
var countV = 0;
var countO = 0;

const reInit = () => {
	InitialValues = {};
	if (data["question"][currentQuestion]["sub"]) {
		InitialValues["sub"] = 0;
	}

	if (data["question"][currentQuestion]["verb"]) {
		InitialValues["verb"] = 0;
	}

	if (data["question"][currentQuestion]["obj"]) {
		InitialValues["obj"] = 0;
	}

	console.log(data["question"][currentQuestion]["sub"]);

	console.log("INIT : " + Object.keys(InitialValues));
};

let InitialValues = {};

reInit();

var CorrectedValues = { ...InitialValues };

const filterSelection = (id) => (id == "sub" ? 1 : id == "verb" ? 2 : 3);

const loadQuestions = () => {
	totalQuestions = Object.keys(data["question"]).length;
	if (currentQuestion < totalQuestions) {
		reInit();
		currentQuestion = currentQuestion + 1;
		// qNo.innerHTML = currentQuestion;
		var combined = "";
		var allWord = data["question"][currentQuestion - 1]["Sentence"].split(" ");

		allWord.forEach((w, i) => {
			combined =
				combined +
				'<span id="' +
				w +
				i +
				'" onclick="markToggle(id)">' +
				w +
				"</span> ";
		});

		qBody.innerHTML = combined;
	} else {
		document.getElementById("cardBody").innerHTML = `
      <div style="text-align:center" classs="container">
          <h1 style="font-size: 100px" class="lead">🎉</h1>
          <h5 style="font-weight: bold" class="lead mt-2 text-success text-center">Congratulations!, You Passed the Exercise</h5>
      </div>
    `;

		displayMessage("success", "Excellent! You got them all right!", "🏆");
	}

	if (currentQuestion == totalQuestions) {
		let evlBtn = document.getElementById("eval");
		if (evlBtn) {
			evlBtn.classList.remove("btn-warning");
			evlBtn.classList.add("btn-success");
			evlBtn.innerText = "Evalute & Finish";
		}
	}
};

const markToggle = (id) => {
	let word = document.getElementById(id);
	if (word.classList.contains("markSub")) {
		if (countS != 0) {
			countS = countS - 1;
		}
		word.classList.remove("markSub");
	} else if (word.classList.contains("markVerb")) {
		if (countV != 0) {
			countV = countV - 1;
		}
		word.classList.remove("markVerb");
	} else if (word.classList.contains("markObj")) {
		if (countO != 0) {
			countO = countO - 1;
		}
		word.classList.remove("markObj");
	} else {
		if (getSelectedFilter() == "sub") {
			countS = countS + 1;
			word.classList.add("markSub");
		} else if (getSelectedFilter() == "verb") {
			countV = countV + 1;
			word.classList.add("markVerb");
		} else if (getSelectedFilter() == "obj") {
			countO = countO + 1;
			word.classList.add("markObj");
		} else {
			// document.getElementById('modalTitle').innerText = 'Warning!'
			document.getElementById("modalEmoji").innerText = "⚠️";
			document.getElementById("modalText").innerText =
				"Please use the buttons above to select the part of speeches of a sentence!";
			var temp = document.getElementById("modalText");
			if (!temp.classList.contains("text-success")) {
				if (!temp.classList.contains("text-danger")) {
					temp.classList.add("text-danger");
				}
			} else {
				temp.classList.remove("text-success");
			}
			$("#ModalErrors").modal("show");
		}
	}
};

const getSelectedFilter = () => $('input[name="btnradio"]:checked').val();
const dismissModal = () => $("#ModalErrors").modal("hide");

const eval = () => {
	let sel_sub = document.getElementsByClassName("markSub");
	let sel_verb = document.getElementsByClassName("markVerb");
	let sel_obj = document.getElementsByClassName("markObj");

	CorrectedValues = { ...InitialValues };
	console.log("EVAL : " + Object.values(CorrectedValues));

	if (sel_sub?.length) {
		console.log("SUB");
		checkCompare(sel_sub, "sub");
	}
	if (sel_verb?.length) {
		console.log("V");
		checkCompare(sel_verb, "verb");
	}
	if (sel_obj?.length) {
		console.log("O");
		checkCompare(sel_obj, "obj");
	}
	CheckMarks();
};

const checkCompare = (sel, pos) => {
	for (let i = 0; i < sel.length; i++) {
		console.log("CC - POS:" + data.question[currentQuestion - 1][pos]);
		if (data.question[currentQuestion - 1]?.[pos]?.includes(sel[i].innerText)) {
			++CorrectedValues[pos];
		}
	}
};

const CheckMarks = () => {
	let success = 0;
	for (let questionData in data.question[currentQuestion - 1]) {
		if (["id", "Sentence"].includes(questionData)) continue;
		for (let correctValData in CorrectedValues) {
			if (correctValData === questionData) {
				const isMatched =
					data.question[currentQuestion - 1][questionData].length ===
					CorrectedValues[questionData];
				console.log(
					"cor: " +
						isMatched +
						" QD : " +
						data.question[currentQuestion - 1][questionData].length,
					"COR : " + CorrectedValues[questionData],
				);
				if (isMatched) {
					console.log("Succ is owrking");
					success++;
					displayMessage("success", "its a success", "🎉");
					continue;
				} else {
					return displayMessage("error", "Its an error", "⚠️");
				}
			}
		}
	}
	console.log(success, Object.entries(CorrectedValues).length);
	if (success === Object.entries(CorrectedValues).length) {
		setTimeout(() => {
			nextQuestion();
		}, 500);
	}
};

const nextQuestion = () => {
	CorrectedValues = {
		...InitialValues,
	};
	document.getElementById("modalEmoji").innerText = "";
	document.getElementById("modalText").innerText = "";
	loadQuestions();
};

$(document).ready(function () {
	if (data) {
		loadQuestions();
	} else {
		document.getElementById("modalEmoji").innerText = "😰";
		document.getElementById("modalText").innerText =
			"Uh Oh!, This is embarassing, Theres a problem loading the data!";
		var temp = document.getElementById("modalText");
		if (!temp.classList.contains("text-success")) {
			if (!temp.classList.contains("text-danger")) {
				temp.classList.add("text-danger");
			}
		} else {
			temp.classList.remove("text-success");
		}
		$("#ModalErrors").modal("show");
	}
});

const displayMessage = (messageType, message, emoji) => {
	let docEmoji = document.getElementById("modalEmoji");
	let docText = document.getElementById("modalText");
	if (docText) {
		docEmoji.innerText = emoji;
		docText.innerText = message;
		var temp = document.getElementById("modalText");
		temp.classList.remove("text-success");
		temp.classList.remove("text-danger");

		if (messageType == "success") {
			temp.classList.add("text-success");
		} else {
			temp.classList.add("text-danger");
		}
	}
};
