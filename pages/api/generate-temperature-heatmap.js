// pages/api/generate-temperature-heatmap.js
import { spawn } from 'child_process';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const python = spawn('python', ['./python/heatmap/sensor_stream.py', '--layout', './python/heatmap/layout.json']);
        let dataToSend = '';

        python.stdout.on('data', (data) => {
            const output = data.toString();
            if (output.startsWith("ERROR:")) {
                console.error(`[Temperature Heatmap] ${output}`.trimEnd());
            } else {
                // DEBUG: Uncomment the following lines to see the output of the Python script
                // console.log(`[Temperature Heatmap] stdout: ${output}`.trimEnd());
                // dataToSend += output;
            }
        });
        
        const exitCode = await new Promise((resolve, reject) => {
            python.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error());
                } else {
                    console.log(`[Temperature Heatmap] Python script exited with code ${code}`.trimEnd());
                    resolve(code);
                }
            });
        });

        // Including exit code in the response for clarity and debugging
        res.status(200).json({ message: dataToSend, exitCode: exitCode });
    } catch (error) {
        console.error('[Temperature Heatmap] Error running Python script', error);
        res.status(500).json({ message: '[Temperature Heatmap] Error running Python script', error: error.toString() });
    }
}
