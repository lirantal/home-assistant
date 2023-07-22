/**
 * Reads in a `commands` flat entries list as the source of learned Broadlink codes
 * and converts it to a SmartIR-compatible format for use in Home Assistant.
 * 
 * Example input: 
 *  ```json
 * { commands: {
 *			off: 'JgDYAAABKJMUNhU2FRITEhQRFBEVNhU2FTUVNhU2FDYVERUQFREVNhURFBIUExISFBITNhU2FTYVEhMSFBMSEhQRFBEVERUSExEVEhMTExITEhQ2FREUNhURFRITExMSExEVERQRFRIUERQSFBMSEhQRFDYVERUSExEVEhMTExITERURFRAVEhQRFBIUExISFBEUERURFRITERUSExMTEhMRFREVEBUSFBEUEhQTEhIUERQRFREVEhM2FRITNhUSFBEUERURFREUNhU2FDYVEhQ1FTYVNhU2FQANBQ==',
 *			cool_auto_25:
 *				'JgDYAAABJZYSOBM4EhURExITExMTOBI4EzgTOBI4EzgTExITExMTOBITExQRFBITEhMTOBM4EjgTExMUERURExITExMSExMTExQRFBIVEBMTExI4ExMTOBIUEhQRFBITEhMTExMTEhMTExIUEhMSExMTEjkSExMTEhQSFBEVERMSFBITExMSExMUERYQFBEVERMTExITExMSFREUEhMSFBEUEjgTExIUEhMSFREVERMSExMTEhMTExMUETgTOBITExMSFBITExMSFBIUERQSOBM4EhMTExMTEgANBQ==',
 * }}
 * ```
 * 
 * Example output:
 * ```json
 * { commands: {
 *  "heat": {
      "low": {
        "16": "JgDYAAABKJMTNxU2FBMSExMSExIUNxQ3EzcUNxQ3ExMTEhQRFDcUEhQTEhMTFBETExITNxQ3FDcUEhMTExMSExMSFBEVERQSExMTExITExMSEhQ3FDcUERQTEhQSExITExIUERURFREUExITEhMTEhQRFBIVERM3FRITExMTExITERURExIVEhQSExIUEhMSFBEUERURFRITEhQSExMTEhM2FTYVERQTExITExMSFBITEhQRFBEVEhQ1FRIUExISFBEUERURFRITNxQ2FBQSNhU2FDYVNhU2FQANBQ==",
 * }}}}
 * ```
 */

// Provide it here with the `commands` object from a JSON object
const commands = json.data.commands;

const newCommands = {};

for (const [key, value] of Object.entries(commands)) {
	if (key === 'off') {
		newCommands['off'] = value;
		continue;
	}

	const [mode, speed, temp] = key.split('_');
	if (!newCommands[mode]) {
		newCommands[mode] = {};
	}

	if (!newCommands[mode][speed]) {
		newCommands[mode][speed] = {};
	}

	if (!newCommands[mode][speed][temp]) {
		newCommands[mode][speed][temp] = value;
	}
}

console.log(newCommands);
