// Data
const modulesData = [
  {
    id: 1,
    title: 'أساسيات المحاسبة',
    order: 1,
    lessons: [
      {
        id: 1,
        title: 'مقدمة عن المحاسبة',
        order: 1,
        files: [
          {
            id: 1,
            title: 'شرح المحاسبة الأساسية',
            type: 'video',
            size: '45 MB',
            duration: '15 دقيقة'
          },
          {
            id: 2,
            title: 'ملخص المحاسبة',
            type: 'pdf',
            size: '2.3 MB'
          }
        ]
      },
      {
        id: 2,
        title: 'المعايير المحاسبية الدولية',
        order: 2,
        files: [
          {
            id: 3,
            title: 'معايير IFRS الكاملة',
            type: 'pdf',
            size: '5.8 MB'
          },
          {
            id: 4,
            title: 'شرح المعايير المحاسبية',
            type: 'video',
            size: '52 MB',
            duration: '20 دقيقة'
          }
        ]
      },
      {
        id: 3,
        title: 'القيود المحاسبية',
        order: 3,
        files: [
          {
            id: 5,
            title: 'أمثلة على القيود',
            type: 'pdf',
            size: '1.5 MB'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'المراجعة الداخلية',
    order: 2,
    lessons: [
      {
        id: 4,
        title: 'مقدمة المراجعة الداخلية',
        order: 1,
        files: [
          {
            id: 6,
            title: 'مبادئ المراجعة الداخلية',
            type: 'pdf',
            size: '3.2 MB'
          },
          {
            id: 7,
            title: 'دور المراجع الداخلي',
            type: 'video',
            size: '38 MB',
            duration: '12 دقيقة'
          },
          {
            id: 8,
            title: 'ملاحظات الدرس',
            type: 'audio',
            size: '8.5 MB',
            duration: '25 دقيقة'
          }
        ]
      },
      {
        id: 5,
        title: 'خطوات المراجعة',
        order: 2,
        files: [
          {
            id: 9,
            title: 'خطوات العملية المراجعة',
            type: 'pdf',
            size: '2.1 MB'
          },
          {
            id: 10,
            title: 'حالات عملية',
            type: 'video',
            size: '65 MB',
            duration: '25 دقيقة'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'تحليل البيانات المالية',
    order: 3,
    lessons: [
      {
        id: 6,
        title: 'النسب المالية',
        order: 1,
        files: [
          {
            id: 11,
            title: 'شرح النسب المالية',
            type: 'video',
            size: '48 MB',
            duration: '18 دقيقة'
          },
          {
            id: 12,
            title: 'جداول النسب',
            type: 'pdf',
            size: '2.8 MB'
          }
        ]
      },
      {
        id: 7,
        title: 'التحليل الأفقي والعمودي',
        order: 2,
        files: [
          {
            id: 13,
            title: 'التحليل الأفقي',
            type: 'pdf',
            size: '3.5 MB'
          },
          {
            id: 14,
            title: 'التحليل العمودي',
            type: 'pdf',
            size: '3.1 MB'
          },
          {
            id: 15,
            title: 'شرح متقدم',
            type: 'video',
            size: '72 MB',
            duration: '30 دقيقة'
          }
        ]
      }
    ]
  }
];

// State management
let state = {
  expandedModules: {},
  selectedLesson: null
};

// Get file icon based on type
function getFileIcon(type) {
  const icons = {
    video: '🎥',
    pdf: '📄',
    audio: '🎵'
  };
  return icons[type] || '📁';
}

// Get file icon class based on type
function getFileIconClass(type) {
  const classes = {
    video: 'file-icon-video',
    pdf: 'file-icon-pdf',
    audio: 'file-icon-audio'
  };
  return classes[type] || 'file-icon-pdf';
}

// Toggle module expansion
function toggleModule(moduleId) {
  state.expandedModules[moduleId] = !state.expandedModules[moduleId];
  renderModules();
}

// Select lesson
function selectLesson(lesson) {
  state.selectedLesson = lesson;
  renderModules();
  renderFiles();
}

// Render modules and lessons
function renderModules() {
  const modulesColumn = document.getElementById('modulesColumn');
  
  let html = '';
  
  modulesData.forEach(module => {
    const isExpanded = state.expandedModules[module.id];
    const isActive = state.selectedLesson && 
      module.lessons.some(l => l.id === state.selectedLesson.id);
    
    html += `
      <div class="module-item">
        <div class="module-header ${isActive ? 'active' : ''}" onclick="toggleModule(${module.id})">
          <div class="module-title">${module.title}</div>
          <svg class="chevron ${isExpanded ? 'expanded' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="lessons-list ${isExpanded ? 'expanded' : ''}">
    `;
    
    module.lessons.forEach(lesson => {
      const isLessonActive = state.selectedLesson && state.selectedLesson.id === lesson.id;
      html += `
        <div class="lesson-item ${isLessonActive ? 'active' : ''}" 
             onclick='selectLesson(${JSON.stringify(lesson)})'>
          ${lesson.title}
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  modulesColumn.innerHTML = html;
}

// Render files for selected lesson
function renderFiles() {
  const filesList = document.getElementById('filesList');
  
  if (!state.selectedLesson) {
    filesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📂</div>
        <div class="empty-state-text">لم يتم اختيار درس بعد</div>
      </div>
    `;
    return;
  }
  
  if (!state.selectedLesson.files || state.selectedLesson.files.length === 0) {
    filesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <div class="empty-state-text">لا توجد ملفات لهذا الدرس</div>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  state.selectedLesson.files.forEach(file => {
    const icon = getFileIcon(file.type);
    const iconClass = getFileIconClass(file.type);
    const typeLabel = file.type === 'video' ? 'فيديو' : file.type === 'pdf' ? 'PDF' : 'صوت';
    const metaInfo = file.duration ? `${typeLabel} • ${file.size} • ${file.duration}` : `${typeLabel} • ${file.size}`;
    
    html += `
      <div class="file-card">
        <div class="file-icon-container ${iconClass}">
          ${icon}
        </div>
        <div class="file-title">${file.title}</div>
        <div class="file-meta">${metaInfo}</div>
        <div class="file-actions">
          <button class="btn btn-primary" onclick='openFile(${JSON.stringify(file)})'>
            فتح
          </button>
          <button class="btn btn-secondary" onclick='downloadFile(${JSON.stringify(file)})'>
            تحميل
          </button>
        </div>
      </div>
    `;
  });
  
  filesList.innerHTML = html;
}

// Open file modal
function openFile(file) {
  showModal('فتح الملف', `سيتم فتح الملف: ${file.title}`);
}

// Download file modal
function downloadFile(file) {
  showModal('تحميل الملف', `سيتم تحميل الملف: ${file.title} (${file.size})`);
}

// Show modal
function showModal(title, text) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  document.getElementById('modal').classList.add('show');
}

// Close modal
function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

// Close modal on background click
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Initialize app
function init() {
  renderModules();
  renderFiles();
}

// Run on page load
init();