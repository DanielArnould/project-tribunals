import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPC_ACTIONS } from '../main/IPC/IPCActions'
import { IPCAPI } from './IPCAPI'
import { AnnotatedDocument, RevTag, Task, TaskInstance } from '../common/types'

const ipc: IPCAPI = {
  ping: () => ipcRenderer.invoke(IPC_ACTIONS.TEST.PING),
  putTask: (task: Task) => ipcRenderer.invoke(IPC_ACTIONS.TASKS.PUT, task),
  getTask: (taskId: string) => ipcRenderer.invoke(IPC_ACTIONS.TASKS.GET, taskId),
  removeTask: (task: Task & RevTag) => ipcRenderer.invoke(IPC_ACTIONS.TASKS.REMOVE, task),
  putAnnotatedDocument: (annotatedDoc: AnnotatedDocument) =>
    ipcRenderer.invoke(IPC_ACTIONS.ANNOTATED_DOCS.PUT, annotatedDoc),
  getAnnotatedDocument: (annotatedDocId: string) =>
    ipcRenderer.invoke(IPC_ACTIONS.ANNOTATED_DOCS.GET, annotatedDocId),
  removeDocument: (annotatedDoc: AnnotatedDocument & RevTag) =>
    ipcRenderer.invoke(IPC_ACTIONS.ANNOTATED_DOCS.REMOVE, annotatedDoc),
  putTaskInstance: (taskInstance: TaskInstance) =>
    ipcRenderer.invoke(IPC_ACTIONS.TASK_INSTANCES.PUT, taskInstance),
  getTaskInstance: (taskInstanceId: string) =>
    ipcRenderer.invoke(IPC_ACTIONS.TASK_INSTANCES.PUT, taskInstanceId),
  removeTaskInstance: (taskInstance: TaskInstance & RevTag) =>
    ipcRenderer.invoke(IPC_ACTIONS.TASK_INSTANCES.PUT, taskInstance)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('ipc', ipc)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.ipc = ipc
}