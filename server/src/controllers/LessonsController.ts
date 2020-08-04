import db from "../database/connection";
import convertHoursToMinutes from "../utils/convertHourToMinutes";
import { Request, Response } from 'express';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class LessonsController {

  async index(request: Request, response: Response) {
    const filters = request.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'Missing filters to search lessons'
      });
    }

    const timeInMinutes = convertHoursToMinutes(time);

    const lessons = await db('lessons')
    .whereExists(function() {
      this.select('lesson_schedule.*')
        .from('lesson_schedule')
        .whereRaw('`lesson_schedule`.`lesson_id` = `lessons`.`id`')
        .whereRaw('`lesson_schedule`.`week_day` = ??', [Number(week_day)])
        .whereRaw('`lesson_schedule`.`from` <= ??', [timeInMinutes])
        .whereRaw('`lesson_schedule`.`to` > ??', [timeInMinutes]);
    })
      .where('lessons.subject', subject)
      .join('users', 'users.id', 'lessons.user_id')
      .select(['lessons.*', 'users.*']);

    return response.json(lessons);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;
    const trx = await db.transaction();
    try {
      const usersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = usersIds[0];

      const lessonsIds = await trx('lessons').insert({
        subject,
        cost,
        user_id
      });

      const lesson_id = lessonsIds[0];

      const lessonSchelude = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          lesson_id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to),
        }
      });

      await trx('lesson_schedule').insert(lessonSchelude);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unspected erro while creating new lesson'
      });
    }
  }
}