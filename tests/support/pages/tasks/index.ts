import { Page, expect, Locator } from '@playwright/test'
import { TaskModel } from '../../../fixtures/task.model'

export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('#newTask')
    }
    async go() {
        await this.page.goto('http://localhost:3000/')
    }

    async create(task: TaskModel) {

        await this.inputTaskName.fill(task.name)
        await this.page.click('css=button >> text=Create')
    }

    async toggle(taskName: string) {
        const targe = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`)
        await targe.click()
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async shoulBeDone(taskName: string) {
        const targe = this.page.getByText(taskName)
        await expect(targe).toHaveCSS('text-decoration-line', 'line-through')
    }
}
