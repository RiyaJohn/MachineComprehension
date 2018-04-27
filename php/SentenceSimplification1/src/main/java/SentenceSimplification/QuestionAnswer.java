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
        QuestionAnswer that = (QuestionAnswer) o;
        return getQuestion().equals(that.getQuestion()) && getAnswer().equals(that.getAnswer());
    }

    @Override
    public int hashCode() {

        return Objects.hash(question, answer);
    }
}
