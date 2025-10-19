# TTS 功能修复规格文档

## 问题描述
当前 TTS（文字转语音）功能无法正常工作，错误日志显示：
```
GameManager.handleWordClick() - utils or TTSUtil not available
```

## 根本原因分析
1. `TTSUtil` 可能没有正确初始化
2. `GameManager` 中没有正确引用 `TTSUtil`
3. 脚本加载顺序问题导致 `TTSUtil` 在 `GameManager` 初始化时不可用

## 解决方案
1. 确保 `TTSUtil` 在 `GameManager` 初始化之前正确初始化
2. 在 `GameManager` 中添加对 `TTSUtil` 的正确引用
3. 添加安全检查以确保在调用 TTS 功能前 `TTSUtil` 已存在

## 实施步骤
1. 检查 `utils.js` 中的 `TTSUtil` 初始化
2. 确保 `GameManager` 在创建时能访问到 `TTSUtil`
3. 修改 `handleWordClick` 方法以正确使用 TTS 功能
4. 添加错误处理以避免在 TTS 不可用时出错

## 验证方法
1. 在单词点击时验证 TTS 功能是否正常工作
2. 确保在不支持 TTS 的环境中不会出现错误