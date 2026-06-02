SELECT u.user_id, u.full_name, u.email, u.city
FROM Users u
LEFT JOIN Registrations r 
    ON u.user_id = r.user_id
    AND r.registration_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
WHERE r.registration_id IS NULL;