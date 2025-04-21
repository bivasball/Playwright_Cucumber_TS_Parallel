import * as fs from 'fs';
import * as path from 'path';

export function getJsonDataApi(testdataFile: string): object {
    const moduleName = testdataFile.substring(0, testdataFile.indexOf("-"));
    const filePath = path.resolve('api', 'resources', 'payload', moduleName, `${testdataFile}.json`);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return jsonData;
}