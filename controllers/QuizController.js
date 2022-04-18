import { Quiz } from "../models/Quiz.js"

// Class QuizController
export class QuizController
{
  // Once the class is called, it's created a score variable
  constructor()
  {
    this.score = 0
  }

  /* =============================================================== */

  /**
   * @param {number} index 
   * @returns the actual question
   * 
   * returns the actual question if exists, otherwise will returns fallse
   */
  getQuestion(index)
  {
    return index < 10 ? Quiz[index].question : false
  }

  /* =============================================================== */

  /**
   * @param {number} index 
   * @returns the options for that question
   * 
   * returns the actual options if exists, otherwise will returns fallse
   */
  getOptions(index)
  {
    return index < 10 ? Quiz[index].options : false
  }

  /* =============================================================== */

  /**
   * @param {string} selectedOption 
   * @param {number} index 
   * @returns score
   * 
   * if the selectedOption is empty or index is 0, then the set the score to 0 and return the final score, otherwise returns the score + 3 if selectedOption is correct, else returns the score with the actual score.
   */
  getScore(selectedOption, index)
  {
    let finalScore = this.score

    if(selectedOption === "" || index < 0)
    {
      this.score = 0
      return finalScore
    }

    return selectedOption === Quiz[index].answer ? this.score += 3 : this.score
  }
}