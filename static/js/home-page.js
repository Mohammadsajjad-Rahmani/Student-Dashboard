// Toggle dark/light mode and save to local storage
document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
});

let modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');
    // Save mode to local storage
    if (document.documentElement.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Function to load the theme from local storage
function loadTheme() {
    let theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.documentElement.classList.add('light');
        modeSwitch.classList.add('active');
    } else {
        document.documentElement.classList.remove('light');
        modeSwitch.classList.remove('active');
    }
}

// Load theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);

function ApplyFunc() {
    let SemesterOption = $('#semester-filter').val();
    let GradeOption = $('#grade-filter').val();
    $.get("/home/semester/filter?semester=" + SemesterOption + "&grade=" + GradeOption).then(result => {
        $('#courses').html(result)
    })
}

document.getElementById('download-pdf').addEventListener('click', function () {
    downloadReport('pdf');
});

document.getElementById('download-word').addEventListener('click', function () {
    downloadReport('word');
});

document.getElementById('download-excel').addEventListener('click', function () {
    downloadReport('excel');
});



function downloadReport(format) {
    let rows = document.querySelectorAll('.products-row');
    let data = [];

    rows.forEach(row => {
        let rowData = {
            name: row.querySelector('.product-cell.category').textContent.trim(),
            grade: row.querySelector('.product-cell.status-cell .status').textContent.trim(),
            rank: row.querySelector('.product-cell.sales').textContent.trim(),
            credit: row.querySelector('.product-cell.stock').textContent.trim(),
            professor: row.querySelector('.product-cell.price').textContent.trim()
        };
            data.push(rowData);
    });

    let url = `/download/${format}/`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            if (`${format}` == 'excel') {
                format = 'xlsx';
            }
             if (`${format}` == 'word') {
                format = 'docx';
            }
            a.download = `report.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error:', error));
    alert("Download Successful")

}

// Function to get CSRF token (assuming Django's CSRF protection)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}