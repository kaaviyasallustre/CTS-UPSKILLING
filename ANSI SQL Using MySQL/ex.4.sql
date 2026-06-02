SELECT e.event_id, e.title,
       COUNT(s.session_id) AS peak_sessions
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
    AND TIME(s.start_time) >= '10:00:00'
    AND TIME(s.start_time) <  '12:00:00'
GROUP BY e.event_id, e.title
ORDER BY peak_sessions DESC;

