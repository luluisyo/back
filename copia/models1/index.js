import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', '123456', {
  dialect: 'postgres',
   define: {timestamps: false}
});

const models = {

  Pais: sequelize.import('./pais'),
  Departamento: sequelize.import('./departamento'),
  Provincia: sequelize.import('./provincia'),
  Lug_nac: sequelize.import('./lug_nac'),
  Tipo_sangre: sequelize.import('./tipo_sangre'),
  Estado_civil: sequelize.import('./estado_civil'),
  Persona: sequelize.import('./persona'),
  Estudiante: sequelize.import('./estudiante'),
  Paralelo: sequelize.import('./paralelo'),
  Nivel_paralelo: sequelize.import('./nivel_paralelo'),
  Materia: sequelize.import('./materia'),
  Aula: sequelize.import('./aula'),
  Titulo: sequelize.import('./titulo'),
  Profesor: sequelize.import('./profesor'),
  Curriculum_prof: sequelize.import('./curriculum_prof'),
  Clase: sequelize.import('./clase'),
  Ocupacion: sequelize.import('./ocupacion'),
  Tutor: sequelize.import('./tutor'),
  Tutor_estudiante: sequelize.import('./tutor_estudiante'),
  Inscipcion: sequelize.import('./inscripcion'),
  Dias: sequelize.import('./dias'),
  Horas: sequelize.import('./horas'),
  Horario: sequelize.import('./horario'),
  Prof_clase: sequelize.import('./prof_clase'),
  Usuario: sequelize.import('./usuario'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;


export default models;
