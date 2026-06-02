SELECT a.event_id,
       a.session_id  AS session_a_id,
       a.title       AS session_a,
       b.session_id  AS session_b_id,
       b.title       AS session_b,
       a.start_time  AS a_start,
       a.end_time    AS a_end,
       b.start_time  AS b_start,
       b.end_time    AS b_end
FROM Sessions a
JOIN Sessions b
  ON a.event_id    = b.event_id
 AND a.session_id  < b.session_id
 AND a.start_time  < b.end_time
 AND a.end_time    > b.start_time;