package main.java.SentenceSimplification;

import arkref.parsestuff.TregexPatternFactory;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.trees.tregex.TregexMatcher;
import edu.stanford.nlp.trees.tregex.TregexPattern;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QuestionGenerator {

    public List<QuestionAnswer> generateQuestions(List<Question> sentenceParseTrees){

        List<QuestionAnswer> questionAnswers = new ArrayList<>();

        for(Question q : sentenceParseTrees){
            questionAnswers.addAll(addUnique(questionAnswers , generateHowQuestions(q.getSourceTree())));
            questionAnswers.addAll(addUnique(questionAnswers , generateWhyQuestions(q.getSourceTree())));
            questionAnswers.addAll(addUnique(questionAnswers , generateWhyQuestions(q.getIntermediateTree())));
        }
        return questionAnswers;
    }

    private List<QuestionAnswer> generateHowQuestions(Tree parseTree){

        List<QuestionAnswer> questionAnswers = new ArrayList<>();

        String tregexOpStr;
        TregexPattern matchPattern;
        TregexMatcher matcher;
        Tree answerNode;
        Tree oldNode;
        Tree parentNode;

        tregexOpStr = "/^RB.*/ = adverb [$+ /^RB.*/ >> (ADVP  $ /^VB.*/ ) >> VP | >: (ADVP  $ /^VB.*/ ) >> VP]| ADVP = adverbphrase ($ /^VB.*/| $ VP)";
        matchPattern = TregexPatternFactory.getPattern(tregexOpStr);
        matcher = matchPattern.matcher(parseTree);


        while(matcher.find()){
            oldNode = matcher.getNode("adverb");
            if(oldNode == null){
                oldNode = matcher.getNode("adverbphrase");
            }
            answerNode = oldNode.deepCopy();
            List<Tree> answerList = answerNode.getLeaves();
            StringBuilder answer = new StringBuilder();
            for(Tree t: answerList){
                answer.append(t.toString()+" ");
            }
            int numChildren = answerNode.numChildren();
            while(numChildren > 0)
                answerNode.removeChild(--numChildren);
            answerNode.setValue("how");
            parentNode = oldNode.parent(parseTree);
            int nodeNumber = parentNode.objectIndexOf(oldNode);
            parentNode.setChild(nodeNumber,answerNode);
            String questionString = AnalysisUtilities.getQuestionString(parseTree);
            QuestionAnswer newpair = new QuestionAnswer(questionString, answer.toString());
            if(!questionAnswers.contains(newpair))
                questionAnswers.add(newpair);
            parentNode.setChild(nodeNumber,oldNode);
        }
        return questionAnswers;
    }

    private List<QuestionAnswer> generateWhyQuestions(Tree parseTree){
        List<QuestionAnswer> questionAnswers = new ArrayList<>();
//        questionAnswers.addAll(replaceBecauseClause(parseTree));
//        questionAnswers.addAll(replaceInOrderTo(parseTree));
//        questionAnswers.addAll(replaceLest(parseTree));
//        questionAnswers.addAll(replaceSoThat(parseTree));
          questionAnswers.addAll(addUnique(questionAnswers , replaceBecauseClause(parseTree)));
          questionAnswers.addAll(addUnique(questionAnswers ,replaceInOrderTo(parseTree)));
          questionAnswers.addAll(addUnique(questionAnswers ,replaceLest(parseTree)));
          questionAnswers.addAll(addUnique(questionAnswers , replaceSoThat(parseTree)));


//        addUnique(questionAnswers , replaceBecauseClause(parseTree));
//        addUnique(questionAnswers ,replaceInOrderTo(parseTree));
//        addUnique(questionAnswers ,replaceLest(parseTree));
//        addUnique(questionAnswers ,replaceSoThat(parseTree));
        return questionAnswers;
    }
    private List<QuestionAnswer> addUnique(List<QuestionAnswer> questionAnswers,List<QuestionAnswer> newInput ){
        System.out.println("addUnique");
        List<QuestionAnswer> questionUniqAnswers = new ArrayList<>();

        for(QuestionAnswer old: questionAnswers) {
            for(QuestionAnswer nw : newInput){
                System.out.println("addUnique innner for");
                if(!nw.equals(old)) {
                    System.out.println("addUnique equals");
                    questionUniqAnswers.add(nw);
                }
            }
        }
        if(questionAnswers.isEmpty())
            return newInput;
        else
            return questionUniqAnswers;
    }
    /*
        Replace the clause containing because by why.
        But do not replace the clause if it contains "just because"
        "John studied because he wanted a good grade." --> "Jogn studied why"
        "Just because he's rich, doesn't mean he is happy." ---> X
     */
    private List<QuestionAnswer> replaceBecauseClause(Tree parseTree){
        List<QuestionAnswer> questionAnswers = new ArrayList<>();
        String tregexOpStr;
        TregexPattern matchPattern;
        TregexMatcher matcher;
        Tree answerNode;
        Tree oldNode;
        Tree parentNode;

        tregexOpStr = "/^*/=replace ( < (/^*/ < /[b|B]ecause/) & !< ((/^*/ < /[j|J]ust/) $+ (/^*/ < because)))";
        matchPattern = TregexPatternFactory.getPattern(tregexOpStr);
        matcher = matchPattern.matcher(parseTree);


        while(matcher.find()){
            oldNode = matcher.getNode("replace");
            answerNode = oldNode.deepCopy();
            List<Tree> answerList = answerNode.getLeaves();
            StringBuilder answer = new StringBuilder();
            for(Tree t: answerList){
                answer.append(t.toString()+" ");
            }
            int numChildren = answerNode.numChildren();
            while(numChildren > 0)
                answerNode.removeChild(--numChildren);
            answerNode.setValue("why");
            parentNode = oldNode.parent(parseTree);
            int nodeNumber = parentNode.objectIndexOf(oldNode);
            parentNode.setChild(nodeNumber,answerNode);
            String questionString = AnalysisUtilities.getQuestionString(parseTree);
            questionAnswers.add(new QuestionAnswer(questionString, answer.toString()));
            parentNode.setChild(nodeNumber,oldNode);
        }
        return questionAnswers;
    }

    /*
            checks for in order to and in order that in the middle of a sentence.
            This may not always form a subordinate clause.
            Hence, we use a regular expression to extract the part of the sentence after "in order to" or "in order that"
            Since both of them may appear at the beginning of the sentence,
            we extract the clause till a comma or period is reached.
            E.g. "He left his job in order to study." --> "He left his job why" "in order to study."
                 "In order to be early, he woke up at 5." --> "why he woke up at 5" "In order to be early,"
         */
    private List<QuestionAnswer> replaceInOrderTo(Tree parseTree){
        List<QuestionAnswer> questionAnswers = new ArrayList<>();
        String sentence = AnalysisUtilities.getQuestionString(parseTree);
        Pattern pattern = Pattern.compile("[i|I]n\\sorder\\s[to|that][^,|.]*[,|\\.]");
        Matcher pmatcher = pattern.matcher(sentence);
        while(pmatcher.find()) {
            int matchStart = pmatcher.start();
            int matchEnd = pmatcher.end();
            String answer = sentence.substring(matchStart,matchEnd);
            int start = (matchStart > 0)?matchStart-1:0;
            int end = (matchEnd+1)<sentence.length()?matchEnd+1:sentence.length();
            String question = sentence.substring(0,start) + " why " + sentence.substring(end, sentence.length());
            questionAnswers.add(new QuestionAnswer(question,answer));
        }
        return questionAnswers;
    }
    private List<QuestionAnswer> replaceLest(Tree parseTree){
        List<QuestionAnswer> questionAnswers = new ArrayList<>();
        String tregexOpStr;
        TregexPattern matchPattern;
        TregexMatcher matcher;
        Tree answerNode;
        Tree oldNode;
        Tree parentNode;

        tregexOpStr = "/^*/=replace < (/^*/ < /[l|L]est/)";
        matchPattern = TregexPatternFactory.getPattern(tregexOpStr);
        matcher = matchPattern.matcher(parseTree);

        while(matcher.find()){
            oldNode = matcher.getNode("replace");
            answerNode = oldNode.deepCopy();
            List<Tree> answerList = answerNode.getLeaves();
            StringBuilder answer = new StringBuilder();
            for(Tree t: answerList){
                answer.append(t.toString()+" ");
            }
            int numChildren = answerNode.numChildren();
            while(numChildren > 0)
                answerNode.removeChild(--numChildren);
            answerNode.setValue("why");
            parentNode = oldNode.parent(parseTree);
            int nodeNumber = parentNode.objectIndexOf(oldNode);
            parentNode.setChild(nodeNumber,answerNode);
            String questionString = AnalysisUtilities.getQuestionString(parseTree);
            questionAnswers.add(new QuestionAnswer(questionString, answer.toString()));
            parentNode.setChild(nodeNumber,oldNode);
        }
        return questionAnswers;
    }

    private List<QuestionAnswer> replaceSoThat(Tree parseTree){
        List<QuestionAnswer> questionAnswers = new ArrayList<>();
        String tregexOpStr;
        TregexPattern matchPattern;
        TregexMatcher matcher;
        Tree answerNode;
        Tree oldNode;
        Tree parentNode;

        tregexOpStr = "SBAR=replace < ((RB < /[s|S]o/)  $+ (IN < that))";
        matchPattern = TregexPatternFactory.getPattern(tregexOpStr);
        matcher = matchPattern.matcher(parseTree);

        while(matcher.find()){
            oldNode = matcher.getNode("replace");
            answerNode = oldNode.deepCopy();
            List<Tree> answerList = answerNode.getLeaves();
            StringBuilder answer = new StringBuilder();
            for(Tree t: answerList){
                answer.append(t.toString()+" ");
            }
            int numChildren = answerNode.numChildren();
            while(numChildren > 0)
                answerNode.removeChild(--numChildren);
            answerNode.setValue("why");
            parentNode = oldNode.parent(parseTree);
            int nodeNumber = parentNode.objectIndexOf(oldNode);
            parentNode.setChild(nodeNumber,answerNode);
            String questionString = AnalysisUtilities.getQuestionString(parseTree);
            questionAnswers.add(new QuestionAnswer(questionString, answer.toString()));
            parentNode.setChild(nodeNumber,oldNode);
        }
        return questionAnswers;
    }
}