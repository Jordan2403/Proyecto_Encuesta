// Array para almacenar encuestas
let surveys = [];

// Mostrar secciones de contenido
function showSection(sectionId) {
    const sections = document.getElementsByClassName('content-section');
    for (let section of sections) {
        section.style.display = 'none'; // Ocultar todas las secciones
    }
    document.getElementById(sectionId).style.display = 'block'; // Mostrar la sección seleccionada
}

// Añadir preguntas dinámicas
let questionCount = 1;
function addQuestion() {
    questionCount++;
    const container = document.getElementById('questionsContainer');
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
        <label for="question${questionCount}">Pregunta ${questionCount}:</label>
        <input type="text" id="question${questionCount}" name="questions[]" required>
        <label>Tipo de Respuesta:</label>
        <select name="answerType[]">
            <option value="text">Texto</option>
            <option value="multiple">Opción Múltiple</option>
            <option value="yesno">Sí / No</option>
        </select>
    `;
    container.appendChild(newQuestion); // Agregar la nueva pregunta al contenedor
}

// Guardar encuesta
function saveSurvey(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const title = document.getElementById('surveyTitle').value;
    const questions = Array.from(document.querySelectorAll('input[name="questions[]"]')).map(input => input.value);
    const answerTypes = Array.from(document.querySelectorAll('select[name="answerType[]"]')).map(select => select.value);

    const survey = {
        title: title,
        questions: questions,
        answerTypes: answerTypes
    };

    surveys.push(survey); // Agregar la encuesta al array
    document.getElementById('surveyForm').reset(); // Reiniciar el formulario
    displaySurveys(); // Mostrar encuestas actualizadas
}

// Mostrar encuestas
function displaySurveys() {
    const surveyList = document.getElementById('surveyItems');
    surveyList.innerHTML = ''; // Limpiar la lista actual
    surveys.forEach((survey, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${survey.title}</strong>
            <button onclick="deleteSurvey(${index})">Eliminar</button>
        `;
        surveyList.appendChild(li); // Agregar la encuesta a la lista
    });
}

// Eliminar encuesta
function deleteSurvey(index) {
    surveys.splice(index, 1); // Eliminar encuesta del array
    displaySurveys(); // Mostrar encuestas actualizadas
}

// Lógica de autenticación básica para el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Credenciales de ejemplo
    const validEmail = 'admin@gmail.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('header').style.display = 'block';
        showSection('home'); // Mostrar la sección de inicio después de iniciar sesión
    } else {
        errorMessage.textContent = 'Correo o contraseña incorrectos.';
    }
});

// Lógica para el formulario de registro de usuarios (sign up)
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Simular el registro de usuario
    alert(`Usuario ${name} registrado con éxito.`);
    showSection('home');
});

// Lógica para iniciar sesión
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Credenciales de ejemplo
    const validEmail = 'admin@gmail.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
        // Ocultar la sección de inicio de sesión
        document.getElementById('loginSection').style.display = 'none';

        // Mostrar la interfaz principal del sistema
        document.getElementById('header').style.display = 'block';
        showSection('home'); // Mostrar la sección de inicio

        // Ocultar el enlace de "Registrarse"
        document.getElementById('signupLink').style.display = 'none';
    } else {
        errorMessage.textContent = 'Correo o contraseña incorrectos.';
    }
});


// Función para cambiar de sección (solo se mostrará una sección a la vez)
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section, .login-container');
    sections.forEach(section => section.style.display = 'none');
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).style.display = 'block';
}



// Lógica para añadir preguntas dinámicamente en el formulario de creación de encuestas
function addQuestion() {
    const questionsContainer = document.getElementById('questionsContainer');
    
    const questionCount = questionsContainer.querySelectorAll('input[type="text"]').length + 1;
    
    const newQuestionLabel = document.createElement('label');
    newQuestionLabel.setAttribute('for', `question${questionCount}`);
    newQuestionLabel.textContent = `Pregunta ${questionCount}:`;
    
    const newQuestionInput = document.createElement('input');
    newQuestionInput.type = 'text';
    newQuestionInput.id = `question${questionCount}`;
    newQuestionInput.name = 'questions[]';
    newQuestionInput.required = true;

    const newAnswerTypeLabel = document.createElement('label');
    newAnswerTypeLabel.textContent = 'Tipo de Respuesta:';
    
    const newAnswerTypeSelect = document.createElement('select');
    newAnswerTypeSelect.name = 'answerType[]';

    const textOption = document.createElement('option');
    textOption.value = 'text';
    textOption.textContent = 'Texto';

    const multipleOption = document.createElement('option');
    multipleOption.value = 'multiple';
    multipleOption.textContent = 'Opción Múltiple';

    const yesnoOption = document.createElement('option');
    yesnoOption.value = 'yesno';
    yesnoOption.textContent = 'Sí / No';

    newAnswerTypeSelect.appendChild(textOption);
    newAnswerTypeSelect.appendChild(multipleOption);
    newAnswerTypeSelect.appendChild(yesnoOption);

    // Añadir la nueva pregunta y su tipo de respuesta al contenedor
    questionsContainer.appendChild(newQuestionLabel);
    questionsContainer.appendChild(newQuestionInput);
    questionsContainer.appendChild(newAnswerTypeLabel);
    questionsContainer.appendChild(newAnswerTypeSelect);
}

// Gráfico de Resultados
const ctx = document.getElementById('resultsChart').getContext('2d');
const resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3'],
        datasets: [{
            label: 'Respuestas',
            data: [12, 19, 3], // Datos de ejemplo
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Comenzar el eje Y en cero
            }
        }
    }
});

// Agregar el evento de guardar encuesta al formulario
document.getElementById("surveyForm").addEventListener("submit", saveSurvey);
