package main.java.SentenceSimplification;

import java.util.Objects;

public class QuestionAnswer {

    private String question;
    private String answer;

    public QuestionAnswer(String question, String answer){
        this.question = question;
        this.answer = answer;
    }
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public boolean equals(Object o) {
        System.out.println("EQ:");

        if (this == o) return true;
        if (!(o instanceof QuestionAnswer)) return false;
        QuestionAnswer that = (QuestionAnswer) o;
        return question.equals(that.question);
    }

    @Override
    public int hashCode() {

        return Objects.hash(question, answer);
    }
}
