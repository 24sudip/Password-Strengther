// 
const strengther = document.querySelector(".strengther");
const passwordInput = document.querySelector('input[type="text"]');
const passwordCheck = document.querySelector(".password-check");

passwordInput.addEventListener("input", updateStrengther);

function updateStrengther() {
    const assessments = calculatePasswordStrength(passwordInput.value);
    let strength = 100;
    passwordCheck.innerHTML = "";
    assessments.forEach(assessment => {
        if (assessment === null || assessment === undefined) return;
        strength -= assessment.strengthLost;
        const pwdCheckEl = document.createElement("p");
        pwdCheckEl.innerHTML = assessment.pwdCheck;
        passwordCheck.appendChild(pwdCheckEl);
    });
    strengther.style.setProperty("--strength-amount", strength);
}

function calculatePasswordStrength(password) {
    const assessment = [];
    assessment.push(lengthAssessment(password));
    assessment.push(lowercaseAssessment(password));
    assessment.push(uppercaseAssessment(password));
    assessment.push(numberAssessment(password));
    assessment.push(specialCharacterAssessment(password));
    assessment.push(repeatCharactersAssessment(password));
    return assessment;
}

// length Assessment function
function lengthAssessment(password) {
    const length = password.length;
    if(length <= 5) {
        return {
            pwdCheck: "Password is too short",
            strengthLost: 40,
        };
    }

    if (length <= 10) {
        return {
            pwdCheck: "Password could be longer",
            strengthLost: 15,
        };
    }
}

// lowercase character Assessment function
function lowercaseAssessment(password) {
    return characterTypeAssessment(password, /[a-z]/g, "lowercase characters");
}

// uppercase character Assessment function
function uppercaseAssessment(password) {
    return characterTypeAssessment(password, /[A-Z]/g, "uppercase characters");
}

// numberAssessment function
function numberAssessment(password) {
    return characterTypeAssessment(password, /[0-9]/g, "numbers");
}

// specialCharacterAssessment function
function specialCharacterAssessment(password) {
    return characterTypeAssessment(password, /[^0-9a-zA-Z\s]/g, "special characters");
}

// characterTypeAssessment function
function characterTypeAssessment(password, regX, assessmentType) {
    const characterMatch = password.match(regX) || [];
    if (characterMatch.length === 0) {
        return {
            pwdCheck: `Password has no ${assessmentType}`,
            strengthLost: 20,
        };
    }

    if (characterMatch.length <= 2) {
        return {
            pwdCheck: `Password must have more ${assessmentType}`,
            strengthLost: 5,
        };
    }
}

function repeatCharactersAssessment(password) {
    const repeatCharMatch = password.match(/(.)\1/g) || [];

    if (repeatCharMatch.length > 0) {
        return {
            pwdCheck: "Password has repeat characters",
            strengthLost: repeatCharMatch.length * 10,
        };
    }
}
