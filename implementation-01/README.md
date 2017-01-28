~~~R
1.
 setwd("C:/Users/apolavar.CS/Documents/Rdocs")
 mydata=read.csv("passing-stats-2014.csv")
 mydata
 myvars <- c("Passing.Yards", "Passing.TD", "Rate", "Rushing.Yards", "Rushing.TD")
 newdata <- mydata[myvars]
 pairs(newdata)
 ~~~
 ![R image](http://s16.postimg.org/oy40w63tx/scatterplot.png "R image")

 ~~~R
 2.
 setwd("C:/Users/apolavar.CS/Documents/Rdocs")
 mydata=read.csv("passing-stats-2014.csv")
 mydata
 myvars <- c(Player", "Conf", "Passing.Yards")
 newdata <- mydata[myvars]

 colour<-function(color) {
 ifelse(color=='ACC','white',
 ifelse(color=='American','aquamarine1',
 ifelse(color=='Big 12','blue3',
 ifelse(color=='Big Ten','brown2',
 ifelse(color=='CUSA','darkmagenta',
 ifelse(color=='Ind','darkorange',
 ifelse(color=='MAC','gray4',
 ifelse(color=='MWC','deepskyblue',
 ifelse(color=='Pac-12','chartreuse',
 ifelse(color=='SEC','darkgoldenrod4',
 ifelse(color=='Sun Belt','bisque1', 'yellow')))))))))))}

 distinct<-unique(newdata$Conf,incomparables=FALSE)

 barplot(newdata$Passing.Yards,horiz = TRUE,xlab = "Passing Yards",names.arg = newdata$Player,las = 1,cex.names = 0.45,xlim =   c(0,5000), col=colour(newdata$Conf))
 
 clrs <- c("white", "aquamarine1", "blue3", "brown2", "darkmagenta", "darkorange","gray4","deepskyblue","chartreuse" ,"darkgoldenrod4","bisque1","yellow")

legend("topright",c("ACC", "American", "Big 12", "Big Ten", "CUSA", "Ind", "MAC", "MWC", "Pac-12", "Sec", "Sun Belt"),cex=0.6,bty="n", fill=clrs)
~~~

 ![R image](http://s13.postimg.org/rn7s48aif/image.png "R image")
 
  
 ~~~R
 3.
 setwd("C:/Users/apolavar.CS/Documents/Rdocs")
 mydata=read.csv("passing-stats-2014.csv")
 mydata
 myvars <- c("Passing.TD","Conf")
 newdata <- mydata[myvars] 
 colour<-function(color) {
 ifelse(color=='ACC','white',
 ifelse(color=='American','aquamarine1',
 ifelse(color=='Big 12','blue3',
 ifelse(color=='Big Ten','brown2',
 ifelse(color=='CUSA','darkmagenta',
 ifelse(color=='Ind','darkorange',
 ifelse(color=='MAC','gray4',
 ifelse(color=='MWC','deepskyblue',
 ifelse(color=='Pac-12','chartreuse',
 ifelse(color=='SEC','darkgoldenrod4',
 ifelse(color=='Sun Belt','bisque1', 'yellow')))))))))))}

distinct<-unique(newdata$Conf,incomparables=FALSE)

mean <- aggregate(Passing.TD ~ Conf, newdata, mean);
 barplot(mean$Passing.TD,xlab = "Conf",ylab= "Passing touchdowns",las = 1,cex.names = 0.6,ylim = c(0,30), names.arg=mean$Conf,col=colour(mean$Conf))
 clrs <- c("white", "aquamarine1", "blue3", "brown2", "darkmagenta", "darkorange","gray4","deepskyblue","chartreuse" ,"darkgoldenrod4","bisque1","yellow")

 legend("topright",c("ACC", "American", "Big 12", "Big Ten", "CUSA", "Ind", "MAC", "MWC", "Pac-12", "Sec", "Sun Belt"),cex=0.6,bty="n", fill=clrs)
~~~
  ![R image](http://s29.postimg.org/jdczbymgn/image.png "R image")
   