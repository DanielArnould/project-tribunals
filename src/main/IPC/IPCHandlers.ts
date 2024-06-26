import { IpcMainEvent, ipcMain } from 'electron'
import { IPC_ACTIONS } from './IPCActions'
import {
  getAllDocuments,
  getAnnotatedDocument,
  putAnnotatedDocument,
  removeAnnotatedDocument
} from '../databases/annotatedDocsDB'
import {
  getAllTaskInstances,
  getTaskInstance,
  putTaskInstance,
  removeTaskInstance
} from '../databases/taskInstancesDB'
import { getAllTasks, getTask, getTasks, putTask, removeTask } from '../databases/tasksDB'

const handlePing = async (_event: IpcMainEvent) => {
  console.log('Pong! The IPC is functioning correctly: ', new Date())
}

// Throws away the ipc event for any handler
const generateHandler = (func) => {
  return (_event: IpcMainEvent, args) => {
    return func(args)
  }
}

const ipcHandlers = [
  {
    event: IPC_ACTIONS.TEST.PING,
    callback: handlePing
  },
  {
    event: IPC_ACTIONS.ANNOTATED_DOCS.PUT,
    callback: generateHandler(putAnnotatedDocument)
  },
  {
    event: IPC_ACTIONS.ANNOTATED_DOCS.GET,
    callback: generateHandler(getAnnotatedDocument)
  },
  {
    event: IPC_ACTIONS.ANNOTATED_DOCS.GET_ALL,
    callback: generateHandler(getAllDocuments)
  },
  {
    event: IPC_ACTIONS.ANNOTATED_DOCS.REMOVE,
    callback: generateHandler(removeAnnotatedDocument)
  },
  {
    event: IPC_ACTIONS.TASKS.PUT,
    callback: generateHandler(putTask)
  },
  {
    event: IPC_ACTIONS.TASKS.GET,
    callback: generateHandler(getTask)
  },
  {
    event: IPC_ACTIONS.TASKS.GET_MANY,
    callback: generateHandler(getTasks)
  },
  {
    event: IPC_ACTIONS.TASKS.GET_ALL,
    callback: generateHandler(getAllTasks)
  },
  {
    event: IPC_ACTIONS.TASKS.REMOVE,
    callback: generateHandler(removeTask)
  },
  {
    event: IPC_ACTIONS.TASK_INSTANCES.PUT,
    callback: generateHandler(putTaskInstance)
  },
  {
    event: IPC_ACTIONS.TASK_INSTANCES.GET,
    callback: generateHandler(getTaskInstance)
  },
  {
    event: IPC_ACTIONS.TASK_INSTANCES.GET_ALL,
    callback: generateHandler(getAllTaskInstances)
  },
  {
    event: IPC_ACTIONS.TASK_INSTANCES.REMOVE,
    callback: generateHandler(removeTaskInstance)
  }
]

export const registerIpcHandlers = () => {
  ipcHandlers.forEach((handler: { event: string; callback: any }) => {
    ipcMain.handle(handler.event, handler.callback)
  })
}
