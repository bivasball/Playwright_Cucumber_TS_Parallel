import fs from "fs";
import path from "path";

const LOGS_DIR = "test-results/api-logs";
const SIZE_LIMIT_MB = 10; // Set the size limit to 10MB

// Function to get total directory size in bytes
function getDirectorySizeInBytes(directory: string): number {
    let totalSize = 0;
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            totalSize += stats.size; // Add file size
        } else if (stats.isDirectory()) {
            totalSize += getDirectorySizeInBytes(filePath); // Recursively compute size
        }
    });

    return totalSize; // Return size in bytes
}

// Function to delete the oldest folder
function deleteOldestFolder(directory: string): boolean {
    const folders = fs.readdirSync(directory)
        .map(folder => ({
            name: folder,
            path: path.join(directory, folder),
            createdAt: fs.statSync(path.join(directory, folder)).birthtime.getTime()
        }))
        .filter(folder => fs.statSync(folder.path).isDirectory()) // Only consider directories
        .sort((a, b) => a.createdAt - b.createdAt); // Sort by oldest first

    if (folders.length > 0) {
        console.log(`Deleting oldest folder: ${folders[0].name}`);
        fs.rmSync(folders[0].path, { recursive: true, force: true });
        return true; // Indicates a folder was deleted
    }
    
    return false; // No folder found to delete
}

// Function to manage log cleanup, ensuring size is <= 10MB
export function manageLogs() {
    let currentSize = getDirectorySizeInBytes(LOGS_DIR);
    let sizeInMB = currentSize / (1024 * 1024);
    //console.log(`Current log folder size: ${sizeInMB.toFixed(4)} MB`);

    while (sizeInMB > SIZE_LIMIT_MB) {
        console.log(`Size exceeds ${SIZE_LIMIT_MB}MB. Removing old logs...`);
        const deleted = deleteOldestFolder(LOGS_DIR);

        if (!deleted) {
            console.log("No more folders to delete.");
            break; // Stop if no more folders are available
        }

        currentSize = getDirectorySizeInBytes(LOGS_DIR); // Recalculate size
        sizeInMB = currentSize / (1024 * 1024);
       // console.log(`Updated log folder size: ${sizeInMB.toFixed(2)} MB`);
    }
}
