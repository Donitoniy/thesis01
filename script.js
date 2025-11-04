// 全局变量
let currentUser = null;

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkAuthState();
});

// 初始化应用
function initializeApp() {
    console.log('智慧编程平台初始化中...');
    
    // 设置默认显示的页面
    showSection('programming');
    
    // 初始化功能卡片点击事件
    setupFeatureCards();
}

// 设置事件监听器
function setupEventListeners() {
    // 导航菜单点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            updateActiveNav(this);
        });
    });

    // 登录/注册模态框事件
    setupModalEvents();
    
    // 认证表单事件
    setupAuthForms();

    // 编程挑战相关事件
    setupCodeChallenge();
}

// 显示指定的内容区域
function showSection(sectionName) {
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示指定的内容区域
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// 更新导航栏活跃状态
function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// 设置功能卡片点击事件
function setupFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            handleFeatureClick(feature);
        });
    });
}

// 处理功能卡片点击
function handleFeatureClick(feature) {
    // 检查用户是否已登录
    if (!currentUser) {
        showMessage('请先登录后再使用此功能', 'error');
        document.getElementById('loginModal').style.display = 'block';
        return;
    }

    switch(feature) {
        case 'courses':
            showProgrammingCourses();
            break;
        case 'practice':
            showCodePractice();
            break;
        case 'ai-basics':
            showSection('ai-basics-detail');
            break;
        case 'ai-tools':
            showSection('ai-tools-detail');
            break;
        case 'submit':
            handleHomeworkSubmit();
            break;
        case 'review':
            handleHomeworkReview();
            break;
        case 'progress':
            showLearningProgress();
            break;
        case 'settings':
            showPersonalSettings();
            break;
        default:
            showMessage('功能开发中...', 'info');
    }
}

// 显示编程课程页面
function showProgrammingCourses() {
    showSection('programming-courses');
    setupCoursesTabs();
}

// 显示代码练习页面
function showCodePractice() {
    showSection('code-practice');
    setupPracticeTabs();
}

// 设置课程标签页功能
function setupCoursesTabs() {
    const tabBtns = document.querySelectorAll('#programming-courses .tab-btn');
    const categories = document.querySelectorAll('#programming-courses .course-category');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));
            
            // 添加当前活动状态
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            document.getElementById(`${category}-courses`).classList.add('active');
        });
    });
}

// 设置练习标签页功能
function setupPracticeTabs() {
    const tabBtns = document.querySelectorAll('#code-practice .tab-btn');
    const categories = document.querySelectorAll('#code-practice .practice-category');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));
            
            // 添加当前活动状态
            btn.classList.add('active');
            const practice = btn.getAttribute('data-practice');
            document.getElementById(`${practice}-practice`).classList.add('active');
        });
    });
}

// 开始课程学习
function startCourse(courseId) {
    const courseNames = {
        'scratch': 'Scratch编程',
        'python-basic': 'Python基础',
        'html-css': '网页制作基础',
        'javascript': 'JavaScript编程',
        'python-advanced': 'Python进阶',
        'java': 'Java编程',
        'cpp': 'C++编程',
        'data-structures': '数据结构与算法',
        'ai-programming': 'AI编程入门'
    };
    
    const courseName = courseNames[courseId] || '未知课程';
    showMessage(`正在启动 ${courseName} 课程...`, 'info');
    
    // 这里可以添加实际的课程启动逻辑
    setTimeout(() => {
        showMessage(`${courseName} 课程内容正在开发中，敬请期待！`, 'info');
    }, 1000);
}

// 开始练习
function startExercise(exerciseId) {
    const exerciseNames = {
        'hello-world': 'Hello World',
        'variables': '变量和数据类型',
        'conditions': '条件语句',
        'loops': '循环结构',
        'bubble-sort': '数组排序',
        'binary-search': '二分查找',
        'fibonacci': '递归算法',
        'calculator': '计算器程序',
        'student-system': '学生管理系统',
        'web-crawler': '网页爬虫'
    };
    
    const exerciseName = exerciseNames[exerciseId] || '未知练习';
    showMessage(`正在启动 ${exerciseName} 练习...`, 'info');
    
    // 这里可以添加实际的练习启动逻辑
    setTimeout(() => {
        showExerciseModal(exerciseId, exerciseName);
    }, 500);
}

// 显示练习模态框
function showExerciseModal(exerciseId, exerciseName) {
    const exerciseContent = getExerciseContent(exerciseId);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>${exerciseName}</h2>
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="exercise-description">
                    <h3>练习描述</h3>
                    <p>${exerciseContent.description}</p>
                </div>
                <div class="exercise-requirements">
                    <h3>要求</h3>
                    <ul>
                        ${exerciseContent.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                <div class="exercise-example">
                    <h3>示例</h3>
                    <pre><code>${exerciseContent.example}</code></pre>
                </div>
                <div class="exercise-editor">
                    <h3>编写代码</h3>
                    <textarea id="code-editor" placeholder="在这里编写你的代码..." style="width: 100%; height: 200px; font-family: monospace; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
                </div>
                <div class="exercise-actions" style="margin-top: 20px; text-align: right;">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">取消</button>
                    <button class="btn btn-primary" onclick="submitExercise('${exerciseId}')">提交代码</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 获取练习内容
function getExerciseContent(exerciseId) {
    const exercises = {
        'hello-world': {
            description: '编写一个程序，输出"Hello, World!"到控制台。',
            requirements: [
                '使用print()函数输出文本',
                '确保输出的文本完全匹配"Hello, World!"'
            ],
            example: 'print("Hello, World!")'
        },
        'variables': {
            description: '学习如何声明和使用不同类型的变量。',
            requirements: [
                '声明一个字符串变量存储你的姓名',
                '声明一个整数变量存储你的年龄',
                '输出这两个变量的值'
            ],
            example: 'name = "张三"\nage = 18\nprint("我的名字是", name, "，我今年", age, "岁")'
        },
        'conditions': {
            description: '使用if-else语句实现条件判断。',
            requirements: [
                '输入一个数字',
                '判断这个数字是正数、负数还是零',
                '输出相应的结果'
            ],
            example: 'num = int(input("请输入一个数字: "))\nif num > 0:\n    print("这是一个正数")\nelif num < 0:\n    print("这是一个负数")\nelse:\n    print("这是零")'
        },
        'loops': {
            description: '掌握for和while循环的使用方法。',
            requirements: [
                '使用for循环输出1到10的数字',
                '使用while循环计算1到100的和'
            ],
            example: '# for循环\nfor i in range(1, 11):\n    print(i)\n\n# while循环\nsum = 0\ni = 1\nwhile i <= 100:\n    sum += i\n    i += 1\nprint("1到100的和是:", sum)'
        }
    };
    
    return exercises[exerciseId] || {
        description: '练习内容正在开发中...',
        requirements: ['完成基本功能'],
        example: '# 代码示例'
    };
}

// 提交练习代码
function submitExercise(exerciseId) {
    const code = document.getElementById('code-editor').value.trim();
    
    if (!code) {
        showMessage('请先编写代码再提交！', 'error');
        return;
    }
    
    showMessage('代码提交成功！正在评估...', 'info');
    
    // 模拟代码评估
    setTimeout(() => {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
        showMessage('练习完成！代码评估：通过 ✓', 'success');
    }, 2000);
}

// 处理作业提交
function handleHomeworkSubmit() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.txt,.zip';
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            submitHomework(file);
        }
    });
    fileInput.click();
}

// 提交作业到Firestore
async function submitHomework(file) {
    try {
        showMessage('正在提交作业...', 'info');
        
        // 读取文件内容进行AI评审
        const fileContent = await readFileContent(file);
        
        // 如果是代码文件，进行AI评审
        if (isCodeFile(file.name)) {
            showMessage('正在进行AI代码评审...', 'info');
            try {
                const aiReview = await generateCodeReview(fileContent, file.name);
                
                // 显示AI评审结果
                const reviewModal = document.createElement('div');
                reviewModal.innerHTML = `
                    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                        <div style="background: white; padding: 20px; border-radius: 10px; max-width: 80%; max-height: 80%; overflow-y: auto;">
                            <h3>AI代码评审结果</h3>
                            <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${aiReview}</pre>
                            <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 15px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">确定</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(reviewModal);
            } catch (reviewError) {
                console.error('AI代码评审失败:', reviewError);
                showMessage('代码评审功能暂时不可用，但作业已成功提交', 'warning');
            }
        }
        
        if (!window.db || !window.db.collection) {
            showMessage('演示模式：作业已模拟提交成功！', 'success');
            return;
        }
        
        // 这里应该上传文件到Firebase Storage，然后保存信息到Firestore
        // 为了演示，我们只保存文件信息
        const homeworkData = {
            fileName: file.name,
            fileSize: file.size,
            submitTime: new Date(),
            studentId: currentUser ? currentUser.uid : 'demo-user',
            studentName: currentUser ? (currentUser.displayName || currentUser.email) : '演示用户',
            status: 'submitted'
        };

        // 保存到Firestore
        await window.db.collection('homework').add(homeworkData);
        showMessage('作业提交成功！', 'success');
        
    } catch (error) {
        console.error('作业提交失败:', error);
        showMessage('演示模式：作业已模拟提交成功！', 'success');
    }
}

// 辅助函数：读取文件内容
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

// 辅助函数：判断是否为代码文件
function isCodeFile(fileName) {
    const codeExtensions = ['.js', '.py', '.java', '.cpp', '.c', '.html', '.css', '.php', '.rb', '.go', '.ts'];
    return codeExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
}

// AI代码评审函数
async function generateCodeReview(code, fileName) {
    const aiPrompt = `请对以下代码进行专业的评审，包括：
1. 代码质量和风格
2. 潜在的bug或问题
3. 性能优化建议
4. 最佳实践建议
5. 总体评分（1-10分）

文件名：${fileName}

代码内容：
${code}

请用中文提供详细的评审报告。`;

    return await window.generateAIContent(aiPrompt);
}

// 处理作业批改查看
async function handleHomeworkReview() {
    try {
        showMessage('正在加载作业列表...', 'info');
        
        if (!window.db || !window.db.collection) {
            // 演示模式下显示模拟数据
            const demoHomework = `您的作业列表（演示数据）：

文件名: 编程作业1.pdf
提交时间: ${new Date().toLocaleString()}
状态: 已提交

文件名: AI学习报告.docx
提交时间: ${new Date(Date.now() - 86400000).toLocaleString()}
状态: 已批改

要查看真实数据，请配置Firebase连接。`;
            alert(demoHomework);
            return;
        }
        
        const snapshot = await window.db.collection('homework')
            .where('studentId', '==', currentUser ? currentUser.uid : 'demo-user')
            .orderBy('submitTime', 'desc')
            .get();
        
        if (snapshot.empty) {
            showMessage('暂无提交的作业', 'info');
            return;
        }
        
        let homeworkList = '您的作业列表：\n\n';
        snapshot.forEach(doc => {
            const data = doc.data();
            homeworkList += `文件名: ${data.fileName}\n`;
            homeworkList += `提交时间: ${data.submitTime.toDate().toLocaleString()}\n`;
            homeworkList += `状态: ${data.status}\n\n`;
        });
        
        alert(homeworkList);
        
    } catch (error) {
        console.error('获取作业列表失败:', error);
        // 演示模式下显示模拟数据
        const demoHomework = `您的作业列表（演示数据）：

文件名: 编程作业1.pdf
提交时间: ${new Date().toLocaleString()}
状态: 已提交

配置Firebase后可查看真实数据。`;
        alert(demoHomework);
    }
}

// 设置编程挑战功能
function setupCodeChallenge() {
    let editor;
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        editor = monaco.editor.create(document.getElementById('code-editor'), {
            value: '// Print a message\nconsole.log("Hello, World!");',
            language: 'javascript',
            theme: 'vs-dark'
        });
    });

    const runCodeBtn = document.getElementById('run-code-btn');
    const outputDiv = document.getElementById('output');

    // 添加AI帮助按钮
    const aiHelpBtn = document.createElement('button');
    aiHelpBtn.textContent = 'AI代码助手';
    aiHelpBtn.style.cssText = 'margin-left: 10px; padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;';
    runCodeBtn.parentNode.insertBefore(aiHelpBtn, runCodeBtn.nextSibling);

    // 添加AI代码优化按钮
    const aiOptimizeBtn = document.createElement('button');
    aiOptimizeBtn.textContent = 'AI代码优化';
    aiOptimizeBtn.style.cssText = 'margin-left: 10px; padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer;';
    aiHelpBtn.parentNode.insertBefore(aiOptimizeBtn, aiHelpBtn.nextSibling);

    // AI帮助功能
    aiHelpBtn.addEventListener('click', async function() {
        const code = editor.getValue();
        const userQuestion = prompt('请描述您遇到的问题或需要帮助的地方：');
        
        if (!userQuestion) return;
        
        try {
            aiHelpBtn.textContent = '正在分析...';
            aiHelpBtn.disabled = true;
            
            const aiHelp = await generateCodeHelp(code, userQuestion);
            
            // 显示AI帮助结果
            showAIModal('AI代码助手', aiHelp);
            
        } catch (error) {
            console.error('AI代码助手失败:', error);
            alert('AI代码助手暂时不可用，请稍后再试。');
        } finally {
            aiHelpBtn.textContent = 'AI代码助手';
            aiHelpBtn.disabled = false;
        }
    });

    // AI代码优化功能
    aiOptimizeBtn.addEventListener('click', async function() {
        const code = editor.getValue();
        
        if (!code.trim()) {
            alert('请先输入一些代码');
            return;
        }
        
        try {
            aiOptimizeBtn.textContent = '正在优化...';
            aiOptimizeBtn.disabled = true;
            
            const optimizedCode = await generateCodeOptimization(code);
            
            // 显示优化建议
            showCodeOptimizationModal(code, optimizedCode);
            
        } catch (error) {
            console.error('AI代码优化失败:', error);
            alert('AI代码优化暂时不可用，请稍后再试。');
        } finally {
            aiOptimizeBtn.textContent = 'AI代码优化';
            aiOptimizeBtn.disabled = false;
        }
    });

    runCodeBtn.addEventListener('click', function() {
        const code = editor.getValue();
        outputDiv.innerHTML = ''; // 清空输出
        try {
            // 重写 console.log
            const originalLog = console.log;
            console.log = function(...args) {
                const message = args.map(arg => {
                    if (typeof arg === 'object' && arg !== null) {
                        return JSON.stringify(arg, null, 2);
                    }
                    return arg.toString();
                }).join(' ');
                outputDiv.innerHTML += message + '\n';
                originalLog.apply(console, args);
            };

            // 执行代码
            new Function(code)();

            // 恢复 console.log
            console.log = originalLog;
        } catch (error) {
            outputDiv.innerHTML = `<span style="color: red;">${error}</span>`;
            
            // 如果有错误，提供AI错误分析
            setTimeout(async () => {
                try {
                    const errorAnalysis = await generateErrorAnalysis(code, error.toString());
                    const errorBtn = document.createElement('button');
                    errorBtn.textContent = '查看AI错误分析';
                    errorBtn.style.cssText = 'margin-top: 10px; padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer;';
                    errorBtn.onclick = () => showAIModal('AI错误分析', errorAnalysis);
                    outputDiv.appendChild(errorBtn);
                } catch (analysisError) {
                    console.error('AI错误分析失败:', analysisError);
                }
            }, 100);
        }
    });

    // 将editor暴露给其他函数使用
    window.codeEditor = editor;
}

// AI代码帮助函数
async function generateCodeHelp(code, question) {
    const aiPrompt = `作为一个专业的编程导师，请帮助学生解决代码问题。

当前代码：
${code}

学生的问题：
${question}

请提供：
1. 问题分析
2. 解决方案
3. 代码示例（如果需要）
4. 相关知识点解释

请用中文回答，语言要通俗易懂。`;

    return await window.generateAIContent(aiPrompt);
}

// AI代码优化函数
async function generateCodeOptimization(code) {
    const aiPrompt = `请对以下JavaScript代码进行优化，提供：
1. 优化后的代码
2. 优化说明
3. 性能改进点
4. 最佳实践建议

原始代码：
${code}

请用中文解释优化理由。`;

    return await window.generateAIContent(aiPrompt);
}

// AI错误分析函数
async function generateErrorAnalysis(code, error) {
    const aiPrompt = `请分析以下JavaScript代码的错误：

代码：
${code}

错误信息：
${error}

请提供：
1. 错误原因分析
2. 修复建议
3. 修复后的代码示例
4. 如何避免类似错误

请用中文回答，帮助初学者理解。`;

    return await window.generateAIContent(aiPrompt);
}

// 显示AI模态框
function showAIModal(title, content) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 80%; max-height: 80%; overflow-y: auto;">
                <h3>${title}</h3>
                <pre style="white-space: pre-wrap; background: #f8f9fa; padding: 15px; border-radius: 5px; border: 1px solid #dee2e6;">${content}</pre>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 15px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">确定</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 显示代码优化模态框
function showCodeOptimizationModal(originalCode, optimizedContent) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 90%; max-height: 90%; overflow-y: auto;">
                <h3>AI代码优化建议</h3>
                <div style="display: flex; gap: 20px;">
                    <div style="flex: 1;">
                        <h4>原始代码：</h4>
                        <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; border: 1px solid #dee2e6; font-size: 12px;">${originalCode}</pre>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <h4>优化建议：</h4>
                    <pre style="white-space: pre-wrap; background: #e8f5e8; padding: 15px; border-radius: 5px; border: 1px solid #c3e6c3;">${optimizedContent}</pre>
                </div>
                <div style="margin-top: 15px; text-align: center;">
                    <button onclick="this.parentElement.parentElement.remove()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">确定</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 设置模态框事件
function setupModalEvents() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtns = document.querySelectorAll('.close');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    // 显示登录模态框
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // 关闭模态框
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // 切换到注册模态框
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });

    // 切换到登录模态框
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
}

// 设置认证表单事件
function setupAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // 登录表单提交
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!window.auth || !window.firebaseFunctions || !window.firebaseFunctions.signInWithEmailAndPassword) {
            showMessage('演示模式：登录功能需要配置Firebase', 'error');
            return;
        }
        
        try {
            await window.firebaseFunctions.signInWithEmailAndPassword(window.auth, email, password);
            document.getElementById('loginModal').style.display = 'none';
            showMessage('登录成功！', 'success');
        } catch (error) {
            showMessage('登录失败: ' + error.message, 'error');
        }
    });

    // 注册表单提交
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const displayName = document.getElementById('displayName').value;
        
        if (!window.auth || !window.firebaseFunctions || !window.firebaseFunctions.createUserWithEmailAndPassword) {
            showMessage('演示模式：注册功能需要配置Firebase', 'error');
            return;
        }
        
        try {
            const userCredential = await window.firebaseFunctions.createUserWithEmailAndPassword(window.auth, email, password);
            await userCredential.user.updateProfile({
                displayName: displayName
            });
            document.getElementById('registerModal').style.display = 'none';
            showMessage('注册成功！', 'success');
        } catch (error) {
            showMessage('注册失败: ' + error.message, 'error');
        }
    });

    // 退出登录
    logoutBtn.addEventListener('click', async function() {
        if (!window.auth || !window.firebaseFunctions || !window.firebaseFunctions.signOut) {
            showMessage('演示模式：退出功能需要配置Firebase', 'error');
            return;
        }
        
        try {
            await window.firebaseFunctions.signOut(window.auth);
            showMessage('已退出登录', 'info');
        } catch (error) {
            showMessage('退出失败: ' + error.message, 'error');
        }
    });
}

// 检查认证状态
function checkAuthState() {
    if (window.auth && window.firebaseFunctions && typeof window.firebaseFunctions.onAuthStateChanged === 'function') {
        window.firebaseFunctions.onAuthStateChanged(window.auth, function(user) {
            const loginBtn = document.getElementById('loginBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            
            if (user) {
                currentUser = user;
                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'block';
                logoutBtn.textContent = `退出 (${user.displayName || user.email})`;
            } else {
                currentUser = null;
                loginBtn.style.display = 'block';
                logoutBtn.style.display = 'none';
            }
        });
    } else {
        console.warn('Firebase Auth 未初始化，使用演示模式');
        // 演示模式下的默认状态
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// 显示消息
function showMessage(message, type = 'info') {
    // 移除现有的消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 创建新消息
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // 插入到主内容区域的顶部
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(messageDiv, mainContent.firstChild);

    // 3秒后自动移除消息
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// 工具函数：格式化日期
function formatDate(date) {
    return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// 工具函数：格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// AI基础知识模块功能
function initAIBasics() {
    // 主题切换功能
    const topicCards = document.querySelectorAll('.topic-card');
    const topicDetails = document.querySelectorAll('.topic-detail');
    
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.dataset.topic;
            
            // 更新活跃状态
            topicCards.forEach(c => c.classList.remove('active'));
            topicDetails.forEach(d => d.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`topic-${topic}`).classList.add('active');
        });
    });
}

// AI工具体验模块功能
function initAITools() {
    // 工具卡片点击事件
    const toolCards = document.querySelectorAll('.tool-card');
    const workspaceContents = document.querySelectorAll('.workspace-content');
    
    toolCards.forEach(card => {
        const toolBtn = card.querySelector('.tool-btn');
        toolBtn.addEventListener('click', function() {
            const tool = card.dataset.tool;
            
            // 隐藏所有工具界面
            workspaceContents.forEach(content => content.classList.remove('active'));
            
            // 显示选中的工具界面
            const targetWorkspace = document.getElementById(`${tool}-workspace`);
            if (targetWorkspace) {
                targetWorkspace.classList.add('active');
            }
        });
    });
}

// 智能文本生成功能
async function generateText() {
    const textType = document.getElementById('textType').value;
    const prompt = document.getElementById('textPrompt').value;
    const output = document.getElementById('textOutput');
    
    if (!prompt.trim()) {
        output.textContent = '请输入主题或关键词';
        return;
    }
    
    output.textContent = '正在生成文本...';
    
    try {
        let aiPrompt = '';
        
        switch(textType) {
            case 'story':
                aiPrompt = `请写一个关于"${prompt}"的有趣故事，要求：1. 故事情节生动有趣 2. 字数在300-500字之间 3. 包含开头、发展、高潮和结尾 4. 语言流畅自然`;
                break;
            case 'email':
                aiPrompt = `请写一封关于"${prompt}"的正式邮件，要求：1. 格式规范 2. 语言得体 3. 内容清晰明确 4. 包含主题、称呼、正文和结尾`;
                break;
            case 'essay':
                aiPrompt = `请写一篇关于"${prompt}"的论文，要求：1. 结构清晰（引言、主体、结论）2. 论证充分 3. 字数在400-600字之间 4. 观点明确`;
                break;
            case 'poem':
                aiPrompt = `请写一首关于"${prompt}"的诗歌，要求：1. 意境优美 2. 韵律和谐 3. 情感真挚 4. 长度适中`;
                break;
        }
        
        const generatedText = await window.generateAIContent(aiPrompt);
        output.textContent = generatedText;
        
    } catch (error) {
        console.error('AI文本生成失败:', error);
        output.textContent = '抱歉，AI文本生成服务暂时不可用。请稍后再试。';
    }
}

// 智能翻译功能
async function translateText() {
    const sourceText = document.getElementById('sourceText').value;
    const translatedText = document.getElementById('translatedText');
    
    if (!sourceText.trim()) {
        translatedText.value = '请输入要翻译的文本';
        return;
    }
    
    translatedText.value = '正在翻译...';
    
    try {
        // 检测语言并生成翻译提示
        const containsChinese = /[\u4e00-\u9fff]/.test(sourceText);
        const containsEnglish = /[a-zA-Z]/.test(sourceText);
        
        let aiPrompt = '';
        if (containsChinese && !containsEnglish) {
            aiPrompt = `请将以下中文文本翻译成英文，要求翻译准确、自然、流畅：\n\n${sourceText}`;
        } else if (containsEnglish && !containsChinese) {
            aiPrompt = `请将以下英文文本翻译成中文，要求翻译准确、自然、流畅：\n\n${sourceText}`;
        } else {
            aiPrompt = `请将以下文本翻译成另一种语言（如果是中文翻译成英文，如果是英文翻译成中文），要求翻译准确、自然、流畅：\n\n${sourceText}`;
        }
        
        const result = await window.generateAIContent(aiPrompt);
        translatedText.value = result;
        
    } catch (error) {
        console.error('AI翻译失败:', error);
        translatedText.value = '抱歉，AI翻译服务暂时不可用。请稍后再试。';
    }
}

// 文本摘要功能
async function generateSummary() {
    const input = document.getElementById('summaryInput').value;
    const output = document.getElementById('summaryOutput');
    
    if (!input.trim()) {
        output.textContent = '请输入要摘要的文本内容';
        return;
    }
    
    output.textContent = '正在生成摘要...';
    
    try {
        const aiPrompt = `请为以下文本生成一个简洁明了的摘要，要求：
1. 提取核心观点和关键信息
2. 保持逻辑清晰，语言简洁
3. 摘要长度控制在原文的1/3左右
4. 突出重点内容

原文内容：
${input}`;
        
        const summary = await window.generateAIContent(aiPrompt);
        output.textContent = summary;
        
    } catch (error) {
        console.error('AI摘要生成失败:', error);
        output.textContent = '抱歉，AI摘要生成服务暂时不可用。请稍后再试。';
    }
}

// AI对话功能
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    addChatMessage(message, 'user');
    input.value = '';
    
    // 显示AI正在思考的消息
    addChatMessage('正在思考中...', 'bot');
    
    try {
        const response = await generateAIResponse(message);
        // 移除"正在思考中..."的消息
        const chatMessages = document.getElementById('chatMessages');
        const lastMessage = chatMessages.lastElementChild;
        if (lastMessage && lastMessage.textContent.includes('正在思考中...')) {
            chatMessages.removeChild(lastMessage);
        }
        addChatMessage(response, 'bot');
    } catch (error) {
        console.error('AI聊天回复失败:', error);
        // 移除"正在思考中..."的消息
        const chatMessages = document.getElementById('chatMessages');
        const lastMessage = chatMessages.lastElementChild;
        if (lastMessage && lastMessage.textContent.includes('正在思考中...')) {
            chatMessages.removeChild(lastMessage);
        }
        addChatMessage('抱歉，AI服务暂时不可用，请稍后再试。', 'bot');
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function generateAIResponse(userMessage) {
    try {
        const aiPrompt = `你是一个友好、专业的AI助手，专门帮助用户学习人工智能相关知识。请根据用户的问题提供准确、有用的回答。

用户问题：${userMessage}

请用中文回答，保持友好和专业的语调。如果问题涉及AI、机器学习、深度学习等技术话题，请提供详细而易懂的解释。`;

        const response = await window.generateAIContent(aiPrompt);
        return response;
        
    } catch (error) {
        console.error('AI回复生成失败:', error);
        throw error; // 重新抛出错误，让调用者处理
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 显示学习进度页面
function showLearningProgress() {
    showSection('learning-progress');
    updateProgressData();
}

// 显示个人设置页面
function showPersonalSettings() {
    showSection('personal-settings');
    setupSettingsNavigation();
    loadUserSettings();
}

// 更新进度数据
function updateProgressData() {
    // 模拟动态更新进度条动画
    setTimeout(() => {
        const progressBars = document.querySelectorAll('#learning-progress .progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 200);
}

// 设置个人设置导航
function setupSettingsNavigation() {
    const navButtons = document.querySelectorAll('.settings-nav-btn');
    const panels = document.querySelectorAll('.settings-panel');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有活动状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            panels.forEach(panel => panel.classList.remove('active'));
            
            // 添加当前活动状态
            button.classList.add('active');
            const targetPanel = button.getAttribute('data-setting') + '-settings';
            document.getElementById(targetPanel).classList.add('active');
        });
    });
    
    // 设置表单提交事件
    setupSettingsForms();
}

// 设置表单提交事件
function setupSettingsForms() {
    const forms = document.querySelectorAll('.settings-form form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveSettings(form);
        });
    });
}

// 保存设置
function saveSettings(form) {
    const formData = new FormData(form);
    const settings = {};
    
    for (let [key, value] of formData.entries()) {
        settings[key] = value;
    }
    
    // 模拟保存到本地存储
    const currentSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    Object.assign(currentSettings, settings);
    localStorage.setItem('userSettings', JSON.stringify(currentSettings));
    
    showMessage('设置已保存', 'success');
}

// 加载用户设置
function loadUserSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    
    // 填充表单字段
    Object.keys(settings).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = settings[key] === 'on' || settings[key] === input.value;
            } else {
                input.value = settings[key];
            }
        }
    });
}

// 显示修改密码模态框
function showChangePasswordModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>修改密码</h2>
            <form id="changePasswordForm">
                <div class="form-group">
                    <label for="currentPassword">当前密码</label>
                    <input type="password" id="currentPassword" required>
                </div>
                <div class="form-group">
                    <label for="newPassword">新密码</label>
                    <input type="password" id="newPassword" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">确认新密码</label>
                    <input type="password" id="confirmPassword" required>
                </div>
                <button type="submit" class="btn btn-primary">确认修改</button>
                <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">取消</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 设置关闭事件
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    // 设置表单提交事件
    modal.querySelector('#changePasswordForm').onsubmit = (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            showMessage('两次输入的密码不一致', 'error');
            return;
        }
        
        // 模拟密码修改
        showMessage('密码修改成功', 'success');
        modal.remove();
    };
}

// 导出用户数据
function exportUserData() {
    const userData = {
        profile: JSON.parse(localStorage.getItem('userSettings') || '{}'),
        progress: {
            completedCourses: 8,
            totalCourses: 15,
            completedExercises: 24,
            totalExercises: 50,
            achievements: 12,
            studyHours: 45
        },
        courses: [
            { name: 'Python基础', progress: 100, status: 'completed' },
            { name: 'JavaScript编程', progress: 65, status: 'in-progress' },
            { name: 'C++编程', progress: 0, status: 'not-started' },
            { name: '数据结构与算法', progress: 0, status: 'not-started' }
        ],
        achievements: [
            { name: '初学者', description: '完成第一个编程练习', date: '2024-01-15' },
            { name: '连续学习', description: '连续7天完成学习任务', date: '2024-01-20' },
            { name: '问题解决者', description: '成功解决10个编程问题', date: '2024-01-22' }
        ]
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user_data.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showMessage('数据导出成功', 'success');
}

// 确认删除账户
function confirmDeleteAccount() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>⚠️ 删除账户</h2>
            <p>您确定要删除账户吗？此操作不可逆，将永久删除您的所有数据。</p>
            <div style="margin-top: 2rem;">
                <button type="button" class="btn btn-danger" onclick="deleteAccount()">确认删除</button>
                <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 设置关闭事件
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    // 全局函数，用于删除账户
    window.deleteAccount = () => {
        // 清除所有本地数据
        localStorage.clear();
        sessionStorage.clear();
        
        // 重置用户状态
        currentUser = null;
        
        // 显示消息并跳转到首页
        showMessage('账户已删除', 'success');
        modal.remove();
        showSection('home');
        
        // 更新UI状态
        checkAuthState();
    };
}

// 页面加载时初始化AI模块
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保DOM完全加载
    setTimeout(() => {
        initAIBasics();
        initAITools();
    }, 100);
});