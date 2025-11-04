// Firebase 配置 - 使用 CDN 版本
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';
// import { getAI, getGenerativeModel, GoogleAIBackend } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-ai.js';

// 您的Firebase项目配置
export const firebaseConfig = {
  apiKey: "AIzaSyDB6TQEPF-yUHPqlKQ2nl-jadQGuOTE0-U",
  authDomain: "thesis-7e2d7.firebaseapp.com",
  projectId: "thesis-7e2d7",
  storageBucket: "thesis-7e2d7.firebasestorage.app",
  messagingSenderId: "444500893271",
  appId: "1:444500893271:web:f5f83ebaa0039980070d12",
  measurementId: "G-KRH7Q7GCX6"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化服务
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 初始化 Firebase AI
// const ai = getAI(app, { backend: new GoogleAIBackend() });
// const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// 导出服务以供其他文件使用
window.auth = auth;
window.db = db;
window.storage = storage;
// window.ai = ai;
// window.model = model;

// 导出Firebase函数以供全局使用
window.firebaseFunctions = {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  // getAI,
  // getGenerativeModel,
  // GoogleAIBackend
};

// 通用AI生成函数
window.generateAIContent = async function(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('AI生成内容时出错:', error);
    throw error;
  }
};

console.log('Firebase v9 (CDN) 初始化完成，包括AI服务');

// Firebase 配置说明
/*
要使用此应用，您需要：

1. 在 Firebase Console (https://console.firebase.google.com/) 创建新项目
2. 启用以下服务：
   - Authentication (启用邮箱/密码登录)
   - Firestore Database
   - Storage (可选，用于文件上传)
   - Hosting

3. 获取您的项目配置信息：
   - 在项目设置中找到"您的应用"部分
   - 选择Web应用，复制配置对象
   - 将上面的 firebaseConfig 替换为您的实际配置

4. 设置 Firestore 安全规则：
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // 允许已认证用户读写自己的作业
       match /homework/{document} {
         allow read, write: if request.auth != null && 
           request.auth.uid == resource.data.studentId;
       }
       
       // 允许已认证用户创建作业
       match /homework/{document} {
         allow create: if request.auth != null && 
           request.auth.uid == request.resource.data.studentId;
       }
     }
   }

5. 设置 Authentication 规则：
   - 在 Authentication > Sign-in method 中启用"电子邮件地址/密码"
   - 可选：设置授权域名

6. 部署到 Firebase Hosting：
   - 安装 Firebase CLI: npm install -g firebase-tools
   - 登录: firebase login
   - 初始化: firebase init hosting
   - 部署: firebase deploy
*/