import sys
import pandas
import pytz


def extractcomments(fn):
    ""
    commentname = fn.replace("data-", "comments-")
    da = pandas.read_csv(fn)
    sel = da[pandas.notnull(da.comment)]
    sel = sel.drop_duplicates(subset="comment", take_last=True)
    sel.timestamp = sel.timestamp.apply(
        lambda x: pandas.Timestamp(x, tz=pytz.utc).tz_convert("US/Pacific"))
    sel.to_csv(commentname, index=False)


def loopfiles(listoffiles):
  for fn in listoffiles:
        print "Extracting comments from", fn
        extractcomments(fn)

if __name__ == '__main__':
    loopfiles(sys.argv[1:])
