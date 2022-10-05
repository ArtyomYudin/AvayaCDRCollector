export const insertCDREvent = `INSERT INTO avaya_cdr (date, duration, calling_number, called_number, call_code)
        VALUES (?, ?, ?, ?, ?)`;
