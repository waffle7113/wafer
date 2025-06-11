// 학생 데이터를 저장할 배열
let students = [];

// 페이지 로드 시 저장된 데이터 불러오기
window.onload = function() {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
        students = JSON.parse(savedStudents);
        updateTable();
    }
};

// 새로운 학생 추가
function addStudent() {
    const nameInput = document.getElementById('studentName');
    const name = nameInput.value.trim();
    
    if (name === '') {
        alert('학생 이름을 입력해주세요.');
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        status: '출석',
        date: new Date().toLocaleDateString()
    };

    students.push(student);
    saveToLocalStorage();
    updateTable();
    nameInput.value = '';
}

// 출석 상태 변경
function changeStatus(id, newStatus) {
    const student = students.find(s => s.id === id);
    if (student) {
        student.status = newStatus;
        student.date = new Date().toLocaleDateString();
        saveToLocalStorage();
        updateTable();
    }
}

// 학생 삭제
function deleteStudent(id) {
    if (confirm('정말로 이 학생을 삭제하시겠습니까?')) {
        students = students.filter(s => s.id !== id);
        saveToLocalStorage();
        updateTable();
    }
}

// 테이블 업데이트
function updateTable() {
    const tbody = document.getElementById('studentList');
    tbody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td class="status-${student.status === '출석' ? 'present' : student.status === '지각' ? 'late' : 'absent'}">${student.status}</td>
            <td>${student.date}</td>
            <td>
                <button class="status-btn" onclick="changeStatus(${student.id}, '출석')">출석</button>
                <button class="status-btn" onclick="changeStatus(${student.id}, '지각')">지각</button>
                <button class="status-btn" onclick="changeStatus(${student.id}, '결석')">결석</button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">삭제</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 로컬 스토리지에 저장
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
} 