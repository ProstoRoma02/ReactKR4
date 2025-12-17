#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Начинаем деплой на GitHub Pages...');

try {
  // Сборка проекта
  console.log('📦 Сборка проекта...');
  execSync('npm run build', { stdio: 'inherit' });

  // Деплой через gh-pages
  console.log('🌐 Деплой на GitHub Pages...');
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });

  console.log('✅ Деплой завершен успешно!');
  console.log('🔗 Сайт будет доступен через несколько минут по адресу:');
  console.log('   https://prostoroma02.github.io/ReactKR4/');
  
} catch (error) {
  console.error('❌ Ошибка деплоя:', error.message);
  process.exit(1);
}