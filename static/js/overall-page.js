// ذخیره کردن حالت انتخابی در Local Storage
let modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');

    if (document.documentElement.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// بارگذاری حالت ذخیره شده از Local Storage
document.addEventListener('DOMContentLoaded', (event) => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.documentElement.classList.add('light');
        modeSwitch.classList.add('active');
    } else {
        document.documentElement.classList.remove('light');
        modeSwitch.classList.remove('active');
    }
});

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
            semester_number: row.querySelector('.product-cell.category').textContent.trim(),
            gpa: row.querySelector('.product-cell.status-cell .status').textContent.trim(),
            total_credits: row.querySelector('.product-cell.sales').textContent.trim(),
            passed_credits: row.querySelector('.product-cell.stock').textContent.trim(),
            failed_credits: row.querySelector('.product-cell.price').textContent.trim()
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
                format = 'xlsx'
            }
            if (`${format}` == 'word') {
                format = 'docx'
            }
            a.download = `report.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error:', error));
    alert('Download Successful')

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