const inserCDREvent = `INSERT INTO voip_traffic (traffic_date, duration, calling_number, called_number, call_code, voip_key)
        VALUES (?, ?, ?, ?, ?, ?)`;

exports.inserCDREvent = inserCDREvent;
