SELECT e.event_id, e.title, e.status
FROM Events e
WHERE e.event_id IN (SELECT event_id FROM Registrations)
  AND e.event_id NOT IN (SELECT event_id FROM Feedback);