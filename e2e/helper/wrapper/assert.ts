import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";

export default class Assert {

    async assertTitle(title: string) {
        await expect(fixture.page).toHaveTitle(title);
    }

    async assertTitleContains(title: string) {
        const pageTitle = await fixture.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url: string) {
        await expect(fixture.page).toHaveURL(url);
    }

    async assertURLContains(title: string) {
        const pageURL = fixture.page.url();
        expect(pageURL).toContain(title);
    }

}